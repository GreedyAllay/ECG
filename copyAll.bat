@echo off
setlocal enabledelayedexpansion

set OUTPUT=all_js_files.txt

:: clear output file
echo. > %OUTPUT%

:: loop through all .js files recursively
for /r %%f in (*.js) do (
    echo ===== FILE: %%f ===== >> %OUTPUT%
    echo. >> %OUTPUT%
    type "%%f" >> %OUTPUT%
    echo. >> %OUTPUT%
    echo. >> %OUTPUT%
)

echo Done. Output saved to %OUTPUT%
pause
