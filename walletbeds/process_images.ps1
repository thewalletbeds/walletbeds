Add-Type -AssemblyName System.Drawing

$src = "C:\Users\User\.gemini\antigravity\brain\54cf4166-a4df-47bc-82b5-d68c158ccde5\media__1779131782534.jpg"
$outDir = "C:\Users\User\.gemini\antigravity\scratch\walletbeds\images"
[System.IO.Directory]::CreateDirectory($outDir)

# 1. Slate (Original) and Hero
Copy-Item $src "$outDir\slate.png" -Force
Copy-Item $src "$outDir\hero.png" -Force
Write-Host "Copied slate.png and hero.png"

# Load the bitmap
$bmp = [System.Drawing.Bitmap]::FromFile($src)

# Function to adjust brightness & contrast using ColorMatrix
function AdjustImage($bitmap, $brightness, $contrast, $outputPath) {
    $width = $bitmap.Width
    $height = $bitmap.Height
    $newBmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($newBmp)
    
    # Create ImageAttributes
    $attrs = New-Object System.Drawing.Imaging.ImageAttributes
    
    # Calculate translation element for brightness & contrast adjustment
    $trans = 0.5 * (1 - $contrast) + $brightness
    $matrixItems = @(
        @($contrast, 0.0, 0.0, 0.0, 0.0),
        @(0.0, $contrast, 0.0, 0.0, 0.0),
        @(0.0, 0.0, $contrast, 0.0, 0.0),
        @(0.0, 0.0, 0.0, 1.0, 0.0),
        @($trans, $trans, $trans, 0.0, 1.0)
    )
    
    # Flatten the matrix array
    $flatMatrix = New-Object "float[][]" 5
    for ($i = 0; $i -lt 5; $i++) {
        $flatMatrix[$i] = [float[]]$matrixItems[$i]
    }
    
    $colorMatrix = New-Object System.Drawing.Imaging.ColorMatrix -ArgumentList @(,$flatMatrix)
    $attrs.SetColorMatrix($colorMatrix)
    
    $rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
    $g.DrawImage($bitmap, $rect, 0, 0, $width, $height, [System.Drawing.GraphicsUnit]::Pixel, $attrs)
    
    $g.Dispose()
    $newBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $newBmp.Dispose()
}

# 2. Black Edition (Darken)
AdjustImage $bmp -0.22 1.30 "$outDir\black.png"
Write-Host "Processed black.png"

# 3. White Edition (Brighten)
AdjustImage $bmp 0.22 0.80 "$outDir\white.png"
Write-Host "Processed white.png"

$bmp.Dispose()
Write-Host "Successfully processed all official images!"
