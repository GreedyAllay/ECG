@echo off
setlocal

set "BACKUP_DIR=%cd%..\backups"
set "SEVENZIP=C:\Program Files\7-Zip\7z.exe"

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HH-mm-ss"') do set TS=%%i

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

set "ZIP_PATH=%BACKUP_DIR%\backup_%TS%.zip"

pushd "%cd%"

"%SEVENZIP%" a -tzip "%ZIP_PATH%" * ^
-x!backups\* ^
-x!*.bat

popd

echo Done: %ZIP_PATH%
pause
