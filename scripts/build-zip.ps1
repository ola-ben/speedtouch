$distFiles = Get-ChildItem -Path "dist" -Force
$paths = $distFiles | ForEach-Object { $_.FullName }
if (Test-Path "speedtouch-site.zip") {
    Remove-Item "speedtouch-site.zip" -Force
}
Compress-Archive -Path $paths -DestinationPath "speedtouch-site.zip" -Force
Write-Host "Created speedtouch-site.zip successfully!"
