$images = @{
    "hero.jpg" = "https://images.unsplash.com/photo-1522771731478-44bf10b5ebd9?auto=format&fit=crop&w=2000&q=80"
    "promo1.jpg" = "https://images.unsplash.com/photo-1616627547514-9279dc9cbe3a?auto=format&fit=crop&w=800&q=80"
    "product1.jpg" = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
    "product2.jpg" = "https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&w=500&q=80"
    "product3.jpg" = "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=500&q=80"
    "product4.jpg" = "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=500&q=80"
    "must1.jpg" = "https://images.unsplash.com/photo-1584100936553-9d8a571dae29?auto=format&fit=crop&w=600&q=80"
    "must2.jpg" = "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=600&q=80"
    "must3.jpg" = "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=600&q=80"
    "must4.jpg" = "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80"
    "gots.png" = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/GOTS_logo.svg/512px-GOTS_logo.svg.png"
    "oeko.png" = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Oeko-Tex_Standard_100_logo.svg/512px-Oeko-Tex_Standard_100_logo.svg.png"
    "woolmark.png" = "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Woolmark_logo.svg/1200px-Woolmark_logo.svg.png"
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$client = New-Object System.Net.WebClient
$client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")

foreach ($key in $images.Keys) {
    Try {
        $client.DownloadFile($images[$key], "$PWD\assets\images\$key")
        Write-Host "Downloaded $key"
    } Catch {
        Write-Host "Failed to download $key"
    }
}
