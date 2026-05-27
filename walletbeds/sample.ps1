Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("C:\Users\User\.gemini\antigravity\brain\54cf4166-a4df-47bc-82b5-d68c158ccde5\media__1779131782534.jpg")

Write-Host "Desk 700, 700: $($bmp.GetPixel(700, 700))"
Write-Host "Desk 800, 800: $($bmp.GetPixel(800, 800))"
Write-Host "Desk 900, 900: $($bmp.GetPixel(900, 900))"
Write-Host "Desk 600, 500: $($bmp.GetPixel(600, 500))"

$bmp.Dispose()
