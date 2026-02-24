@echo off

REM Clean up
set libs_path=.\libs
if not exist "%libs_path%" mkdir "%libs_path%"
del /q "%libs_path%\natsjob*" 2>nul

REM Build version number
set version_main=v1.0

REM Get current date (YYYYMMDD)
for /f "tokens=2 delims==" %%a in ('wmic os get localdatetime /value') do set datetime=%%a
set version_build_date=%datetime:~0,8%
set version=%version_main%.%version_build_date%

REM Get build time (YYYYMMDDHHMM)
set buildTime=%datetime:~0,12%
set ldflags_param=-s -w -X main.Version=%version% -X main.BuildTime=%buildTime%

REM Compile for different platforms
echo Compiling darwin/arm64...
set GOOS=darwin
set GOARCH=arm64
go build -ldflags "%ldflags_param%" -o "%libs_path%\natsjob-%version%-darwin-arm64

echo Compiling linux/amd64...
set GOOS=linux
set GOARCH=amd64
go build -ldflags "%ldflags_param%" -o "%libs_path%\natsjob-%version%-linux-amd64

echo Compiling linux/arm64...
set GOOS=linux
set GOARCH=arm64
go build -ldflags "%ldflags_param%" -o "%libs_path%\natsjob-%version%-linux-arm64

echo Compiling windows/amd64...
set GOOS=windows
set GOARCH=amd64
go build -ldflags "%ldflags_param%" -o "%libs_path%\natsjob-%version%-windows-amd64.exe

echo Compiling windows/arm64...
set GOOS=windows
set GOARCH=arm64
go build -ldflags "%ldflags_param%" -o "%libs_path%\natsjob-%version%-windows-arm64.exe



echo Build completed!