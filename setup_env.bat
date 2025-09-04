@echo off
setlocal enableextensions

rem Use Jenkins workspace if present
if not "%WORKSPACE%"=="" pushd "%WORKSPACE%"

rem Ensure Node is on PATH (adjust if your Node lives elsewhere)
where node >nul 2>&1 || set "PATH=C:\Program Files\nodejs;%PATH%"

rem Clean previous artifacts
for %%D in ("allure-results" "allure-report" "playwright-report") do (
  if exist "%%~D" rmdir /s /q "%%~D"
)

rem Install deps
call npm ci || goto :fail
call npx playwright install || goto :fail

rem Produce Allure results
set "ALLURE_RESULTS_DIR=allure-results"

rem Run tests (pick ONE). Examples:
rem call npx playwright test --project=chromium || goto :fail
rem call npx playwright test --grep @master || goto :fail
call npx playwright test || goto :fail

:success
echo === SUCCESS ===
if not "%WORKSPACE%"=="" popd
exit /b 0

:fail
echo === FAILED with errorlevel %ERRORLEVEL% ===
if not "%WORKSPACE%"=="" popd
exit /b %ERRORLEVEL%
