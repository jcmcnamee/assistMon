$uri = "http://192.168.19.146:3000/update"

$data = @{
   Message = "Hello world!"
}

$data = $data | ConvertTo-Json

Invoke-RestMethod -Uri $uri -Method Post -Body $data -ContentType "application/json" -Verbose