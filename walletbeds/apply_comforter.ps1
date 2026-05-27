$csharpCode = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class ImageProcessor {
    public static bool IsPointInPolygon(Point p, Point[] polygon) {
        bool isInside = false;
        for (int i = 0, j = polygon.Length - 1; i < polygon.Length; j = i++) {
            if (((polygon[i].Y > p.Y) != (polygon[j].Y > p.Y)) &&
                (p.X < (polygon[j].X - polygon[i].X) * (p.Y - polygon[i].Y) / (polygon[j].Y - polygon[i].Y) + polygon[i].X)) {
                isInside = !isInside;
            }
        }
        return isInside;
    }

    public static void ProcessImage(string newImgPath, string oldImgPath, string destPath, int offsetX, int offsetY, bool isBear) {
        using (Bitmap newBmp = new Bitmap(newImgPath))
        using (Bitmap oldBmp = new Bitmap(oldImgPath)) {
            int width = newBmp.Width;
            int height = newBmp.Height;
            
            Rectangle rect = new Rectangle(0, 0, width, height);
            BitmapData newData = newBmp.LockBits(rect, ImageLockMode.ReadWrite, newBmp.PixelFormat);
            BitmapData oldData = oldBmp.LockBits(rect, ImageLockMode.ReadOnly, oldBmp.PixelFormat);
            
            int bytes = Math.Abs(newData.Stride) * height;
            byte[] newRgb = new byte[bytes];
            byte[] oldRgb = new byte[bytes];
            
            System.Runtime.InteropServices.Marshal.Copy(newData.Scan0, newRgb, 0, bytes);
            System.Runtime.InteropServices.Marshal.Copy(oldData.Scan0, oldRgb, 0, bytes);
            int pixelSize = Image.GetPixelFormatSize(newBmp.PixelFormat) / 8;
            
            // Perfect tighter 4-sided polygon for the inner mattress surface to prevent bleeding
            Point[] mattressPolygon = new Point[] {
                new Point(270, 580),
                new Point(450, 530),
                new Point(800, 600),
                new Point(550, 820)
            };
            
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++) {
                    int idx = (y * newData.Stride) + (x * pixelSize);
                    double b = newRgb[idx];
                    double g = newRgb[idx + 1];
                    double r = newRgb[idx + 2];
                    
                    double maxVal = Math.Max(r, Math.Max(g, b));
                    double minVal = Math.Min(r, Math.Min(g, b));
                    double diff = maxVal - minVal;
                    
                    Point p = new Point(x, y);
                    
                    if (IsPointInPolygon(p, mattressPolygon)) {
                        bool isPillow = (r > 130 && g > 130 && b > 130 && diff < 22);
                        bool isWallet = (r > g + 5 && g > b - 10);
                        
                        if (!isPillow && !isWallet) {
                            int srcX = Math.Max(0, Math.Min(width - 1, x + offsetX));
                            int srcY = Math.Max(0, Math.Min(height - 1, y + offsetY));
                            
                            int oldIdx = (srcY * oldData.Stride) + (srcX * pixelSize);
                            double oldB = oldRgb[oldIdx];
                            double oldG = oldRgb[oldIdx + 1];
                            double oldR = oldRgb[oldIdx + 2];
                            
                            if (isBear) {
                                // Tint tiger orange to grizzly brown for Bears
                                oldR = oldR * 0.7;
                                oldG = oldG * 0.5;
                                oldB = oldB * 0.4;
                            }
                            
                            // Multiply by new shadows (b/45.0) to maintain perfect 3D depth and wrinkles
                            double lighting = Math.Min(1.8, (r+g+b)/(3.0*45.0));
                            
                            newRgb[idx] = (byte)Math.Min(255.0, oldB * lighting);
                            newRgb[idx + 1] = (byte)Math.Min(255.0, oldG * lighting);
                            newRgb[idx + 2] = (byte)Math.Min(255.0, oldR * lighting);
                        }
                    }
                }
            }
            
            System.Runtime.InteropServices.Marshal.Copy(newRgb, 0, newData.Scan0, bytes);
            newBmp.UnlockBits(newData);
            oldBmp.UnlockBits(oldData);
            newBmp.Save(destPath, ImageFormat.Png);
        }
    }
}
"@

Add-Type -AssemblyName System.Drawing
Add-Type -TypeDefinition $csharpCode -ReferencedAssemblies "System.Drawing"

$newImg = "C:\Users\User\.gemini\antigravity\brain\54cf4166-a4df-47bc-82b5-d68c158ccde5\media__1779132650868.jpg"
$oldLions = "C:\Users\User\.gemini\antigravity\brain\54cf4166-a4df-47bc-82b5-d68c158ccde5\walletbed_lions_1779128588160.png"
$oldTigers = "C:\Users\User\.gemini\antigravity\brain\54cf4166-a4df-47bc-82b5-d68c158ccde5\walletbed_tigers_1779128917513.png"

$outDir = "C:\Users\User\.gemini\antigravity\scratch\walletbeds\images"

# Execute perfect polygon masking and offsetting (using old pillow textures to avoid the old wallet)
[ImageProcessor]::ProcessImage($newImg, $oldLions, "$outDir\lions.png", 100, -300, $false)
[ImageProcessor]::ProcessImage($newImg, $oldTigers, "$outDir\tigers.png", 100, -300, $false)
[ImageProcessor]::ProcessImage($newImg, $oldTigers, "$outDir\bears.png", 100, -300, $true) # Tinted for bears!

Write-Host "Comforters transplanted perfectly!"
