# Network Security Lab — Nginx TLS/SSL Portfolio

**Mehmet Surmeli | Software Engineering | Vizja University, Warsaw**

---

## Overview

This repository contains the complete setup for the Network Security lab:
**Configuring HTTPS with Nginx and TLS/SSL**.

The goal was to build a personal portfolio website, serve it using Nginx in a Docker container,
configure a self-signed TLS/SSL certificate, and capture + analyse the difference between
HTTP and HTTPS traffic using Wireshark/TShark.

---

## Project Structure

```
portfolio-lab/
├── website/
│   ├── index.html          # Portfolio website (HTML)
│   ├── style.css           # Styling
│   └── app.js              # JavaScript (terminal animation, scroll effects)
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx configuration with TLS
├── nginx.crt               # Self-signed TLS certificate (generated locally)
├── nginx.private.key       # Private key (generated locally, NOT committed to GitHub)
└── README.md               # This file
```

> **Note:** `nginx.crt` and `nginx.private.key` are generated on your local machine using OpenSSL.
> The private key should **never** be committed to a public repository.

---

## Steps to Run

### Step 1 — Generate a Self-Signed Certificate

```bash
openssl req \
  -x509 \
  -newkey rsa:4096 \
  -keyout nginx.private.key \
  -out nginx.crt \
  -days 365 \
  -nodes
```

Fill in the prompts (or press Enter for defaults). For Common Name, use `localhost`.

---

### Step 2 — Start the Docker Container (HTTP only first)

Edit `docker-compose.yml` to only expose port 80 and no volumes for nginx.conf/certs yet.
Then run:

```bash
docker compose up -d
docker ps
```

Visit: `http://localhost` — you should see the portfolio website.

---

### Step 3 — Capture HTTP Traffic

Open Wireshark, select your network interface, apply filter `http`, and refresh the page.
You will see the HTML content fully visible in plaintext.

Save capture as `http-capture.pcapng`.

---

### Step 4 — Enable HTTPS

Use the full `docker-compose.yml` (both ports 80 and 443, all volumes mounted):

```bash
docker compose down
docker compose up -d
```

Visit: `https://localhost`
Accept the browser warning (self-signed certificate).

---

### Step 5 — Capture HTTPS Traffic

Open Wireshark, apply filter `tls`, and refresh the HTTPS page.
You will see the TLS handshake but **no readable content**.

Save capture as `https-capture.pcapng`.

---

## TLS Configuration Details

| Item                | Value                        |
|---------------------|------------------------------|
| Certificate type    | Self-signed (RSA 4096-bit)   |
| Validity            | 365 days                     |
| Protocols enabled   | TLSv1.2, TLSv1.3             |
| Port                | 443 (HTTPS), 80 (HTTP→redirect) |
| Nginx image         | nginx:alpine                 |

---

## TLS Handshake Stages (Wireshark)

| Stage | What happens |
|-------|-------------|
| Client Hello | Browser sends supported TLS versions, cipher suites, random value |
| Server Hello | Server selects TLS version and cipher suite |
| Certificate | Server sends nginx.crt (self-signed) |
| Key Exchange | Session keys derived — never transmitted directly |
| Application Data | All HTTP content encrypted, unreadable in Wireshark |

---

## HTTP vs HTTPS Comparison

| Property | HTTP | HTTPS |
|---|---|---|
| Port | 80 | 443 |
| Encryption | None | TLS 1.2 / 1.3 |
| Content visible in Wireshark | Yes | No |
| MitM attack possible | Yes | No (with valid cert) |

---

## Useful Commands

```bash
# View running containers
docker ps

# View Nginx logs
docker logs nginx-web-server

# Test Nginx config inside container
docker exec -it nginx-web-server nginx -t

# Stop containers
docker compose down

# Restart containers
docker compose restart
```

---

## Related Labs (Network Security Module)

- **Lab 1** — Network Topology & OSI/TCP-IP Models (Cisco Packet Tracer + draw.io)
- **Lab 3** — Access Control Lists — 10-stage ACL lab (Cisco Packet Tracer)
- **Lab 3.1** — CIA Triad & Cryptography Research Reports
- **Lab 4** — PKI Lifecycle with OpenSSL (Ed25519 — CA, CSR, Certificate chain)
- **Lab 5.1** — Telnet vs SSH Traffic Analysis (tshark, Ubuntu VMs, VirtualBox)
- **Lab 5.2** — ARP Packet Analysis (tshark, pcapng file analysis)
- **Lab 5 (VPN)** — Gateway-to-Gateway IPSec VPN with strongSwan/IKEv2 (Ubuntu VMs)
- **Lab 6 (this)** — Nginx TLS/SSL + Docker + Wireshark capture

---

*Vizja University — Network Security Module*
