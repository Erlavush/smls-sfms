# Define directories/files/extensions to exclude
$excludeDirs = @("node_modules", ".git", ".next", "generated") # Directories containing these names will be excluded
$excludeFiles = @(".env*", "package-lock.json", "yarn.lock", "create_context.ps1", "project_context.txt") # Specific files/patterns to exclude by name
$excludeExtensions = @(".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".svg", ".woff", ".woff2", ".ttf", ".eot", ".pdf", ".zip", ".exe", ".dll", ".db") # Exclude common binary/generated/database files

# Output file path
$outputFile = ".\project_context.txt"
Write-Host "--- Starting Context Script ---"
Write-Host "Output file target: $outputFile"
$currentDir = $PWD.Path
Write-Host "Running in directory: $currentDir"

# Clear output file or create if not exists
if (Test-Path $outputFile) {
    Clear-Content -Path $outputFile
    Write-Host "Cleared existing output file."
} else {
    New-Item -Path $outputFile -ItemType File -Force | Out-Null
    Write-Host "Created new output file."
}


# Get all files recursively
Write-Host "Searching for files..."
try {
    $allFiles = Get-ChildItem -Path . -Recurse -File -ErrorAction SilentlyContinue
    Write-Host "Found $($allFiles.Count) total items initially."
} catch {
     Write-Error "Failed to list files initially: $($_.Exception.Message)"
     exit 1
}


$processedCount = 0
$excludedCount = 0

# Process each file found
foreach ($item in $allFiles) {
    $filePath = $item.FullName
    # Ensure relative path calculation is robust
    if ($filePath.StartsWith($currentDir)) {
         $relativePath = $item.FullName.Substring($currentDir.Length).TrimStart('\/')
         if ($relativePath -eq "") { $relativePath = $item.Name } # Handle files in root
    } else {
         $relativePath = $item.FullName # Fallback
    }

    # --- Exclusion Checks ---
    $isExcluded = $false
    $exclusionReason = ""

    # Check if path contains any excluded directory names (Improved Check)
    foreach ($dir in $excludeDirs) {
        # Check if any part of the directory path matches the excluded dir name
        if (($item.DirectoryName -split '[\\/]') -contains $dir) {
            $isExcluded = $true
            $exclusionReason = "Directory ($dir)"
            break
        }
    }

    # Check if file name matches excluded patterns (if not already excluded)
    if (-not $isExcluded) {
        foreach ($filePattern in $excludeFiles) {
            if ($item.Name -like $filePattern) {
                $isExcluded = $true
                $exclusionReason = "File Pattern ($filePattern)"
                break
            }
        }
    }

    # Check if file extension matches excluded extensions (if not already excluded)
     if (-not $isExcluded) {
        foreach ($ext in $excludeExtensions) {
             if ($item.Extension -eq $ext) {
                 $isExcluded = $true
                 $exclusionReason = "Extension ($ext)"
                 break
             }
        }
    }

    # --- Processing or Skipping ---
    if ($isExcluded) {
        $excludedCount++
        # Write-Host "Skipping (Excluded: $exclusionReason): $relativePath"
    } else {
        # File is not excluded, try to process it
        Write-Host "Processing: $relativePath"
        $processedCount++
        $fileContentRead = $false
        $content = "[ERROR: Could not read file content]" # Default error message

        try {
            # Add file header to output first
            Add-Content -Path $outputFile -Value "--- START FILE: $relativePath ---"

            # Check if file has content before reading
            if ($item.Length -gt 0) {
                # Attempt 1: Use -LiteralPath and -Encoding UTF8 (Most robust)
                try {
                    $content = Get-Content -LiteralPath $filePath -Encoding UTF8 -ErrorAction Stop | Out-String
                    $fileContentRead = $true
                    # Write-Host "Read using -LiteralPath -Encoding UTF8" # Debugging
                } catch {
                     Write-Warning "WARNING: Failed using -LiteralPath -Encoding UTF8 for '$relativePath'. Error: $($_.Exception.Message)"
                    # Attempt 2: Use -LiteralPath without explicit Encoding
                    try {
                         $content = Get-Content -LiteralPath $filePath -ErrorAction Stop | Out-String
                         $fileContentRead = $true
                         Write-Host "Read using -LiteralPath (no encoding specified)" # Debugging
                    } catch {
                         Write-Warning "WARNING: Failed using -LiteralPath for '$relativePath'. Error: $($_.Exception.Message)"
                         # Attempt 3: Original path without -LiteralPath (fallback)
                         try {
                              $content = Get-Content -Path $filePath -Encoding UTF8 -ErrorAction Stop | Out-String
                              $fileContentRead = $true
                              Write-Host "Read using -Path -Encoding UTF8 (fallback)" # Debugging
                         } catch {
                              Write-Warning "WARNING: Failed using -Path -Encoding UTF8 for '$relativePath'. Error: $($_.Exception.Message)"
                              try {
                                   $content = Get-Content -Path $filePath -ErrorAction Stop | Out-String
                                   $fileContentRead = $true
                                   Write-Host "Read using -Path (no encoding, fallback)" # Debugging
                              } catch {
                                   # Final failure
                                    Write-Error "ERROR: All attempts failed to read file '$relativePath'. Error: $($_.Exception.Message)"
                                    # Keep default error message for $content
                              }
                         }
                    }
                }
            } else {
                # File is empty
                 $content = "[EMPTY FILE]"
                 $fileContentRead = $true # Mark as "read" since we know it's empty
            }

            # Add the content (or error message) to the output file
            Add-Content -Path $outputFile -Value $content

            # Add file footer to output
            Add-Content -Path $outputFile -Value "`n--- END FILE: $relativePath ---`n"

        } catch {
            # Catch any broader error during the Add-Content stages etc.
            $errorMessage = "ERROR processing block for file '$relativePath': $($_.Exception.Message)"
            Write-Error $errorMessage
            # Ensure footer is added even on outer error
            Add-Content -Path $outputFile -Value $errorMessage
            Add-Content -Path $outputFile -Value "`n--- END FILE: $relativePath ---`n"
        }
    }
}

Write-Host "--- Script Finished ---"
Write-Host "Processed $processedCount files."
Write-Host "Excluded $excludedCount files."
Write-Host "Output saved to: $outputFile"

# Optional: Copy to clipboard (Windows) - Uncomment if desired
# Get-Content -Path $outputFile | Set-Clipboard
# if ($?) { Write-Host "Output also copied to clipboard." }