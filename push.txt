$variable = Read-Host "insert your commit name"
git add .
git commit -m "$variable"
git push 