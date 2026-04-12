param(
  [string]$Source,
  [Parameter(Mandatory = $true)]
  [string]$Target
)

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

if ([string]::IsNullOrWhiteSpace($Source)) {
  $Source = Join-Path $scriptRoot "..\\dist\\index.html"
}

$resolvedSource = Resolve-Path -LiteralPath $Source -ErrorAction Stop
$targetDirectory = Split-Path -Parent $Target

if ([string]::IsNullOrWhiteSpace($targetDirectory)) {
  throw "Target must include a destination directory: $Target"
}

if (-not (Test-Path -LiteralPath $targetDirectory)) {
  New-Item -ItemType Directory -Path $targetDirectory -Force | Out-Null
}

Copy-Item -LiteralPath $resolvedSource -Destination $Target -Force
Write-Host "Exported $resolvedSource -> $Target"
