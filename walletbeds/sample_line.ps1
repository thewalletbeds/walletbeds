Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("C:\Users\User\.gemini\antigravity\brain\54cf4166-a4df-47bc-82b5-d68c158ccde5\media__1779131782534.jpg")

Write-Host "Sampling y=600 across x=600 to 920:"
for ($x = 600; $x -le 920; $x += 20) {
    $c = $bmp.GetPixel($x, 600)
    Write-Host "x=$x : R=$($c.R), G=$($c.G), B=$($c.B)"
}

Write-Host "`nSampling y=700 across x=500 to 900:"
for ($x = 500; $x -le 900; $x += 20) {
    $c = $bmp.GetPixel($x, 700)
    Write-Host "x=$x : R=$($c.R), G=$($c.G), B=$($c.B)"
}

$bmp.Dispose()
