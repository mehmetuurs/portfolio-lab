# Network Security Lab — Nginx TLS/SSL Portfolio

**Mehmet Surmeli | Student ID: 63452 | Software Engineering | Vizja University, Warsaw**

---

## Overview

This repository contains the complete setup for the Network Security lab: **Configuring HTTPS with Nginx and TLS/SSL**.

The goal was to build a personal portfolio website, serve it using Nginx in a Docker container, configure a self-signed TLS/SSL certificate, and capture + analyse the difference between HTTP and HTTPS traffic using Wireshark.

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
├── nginx.private.key       # Private key (NOT committed to GitHub)
├── SKILLS.md               # Full skills and lab list
└── README.md               # This file
```

---

## Steps to Run

### Step 1 — Generate a Self-Signed Certificate
```bash
openssl req -x509 -newkey rsa:4096 -keyout nginx.private.key -out nginx.crt -days 365 -nodes
```
For Common Name use: `localhost`

### Step 2 — Start Docker Container
```bash
docker compose up -d
docker ps
```
Visit: `http://localhost`

### Step 3 — Capture HTTP Traffic
Open Wireshark → select `lo0` → filter `http` → refresh page → save as `http-capture.pcapng`

### Step 4 — Enable HTTPS
```bash
docker compose down
docker compose up -d
```
Visit: `https://localhost` — accept the browser warning (self-signed cert)

### Step 5 — Capture HTTPS Traffic
Open Wireshark → filter `tls` → refresh page → observe TLS handshake → save as `https-capture.pcapng`

---

## TLS Configuration

| Item | Value |
|---|---|
| Certificate type | Self-signed (RSA 4096-bit) |
| Validity | 365 days |
| Protocols enabled | TLSv1.2, TLSv1.3 |
| Port | 443 (HTTPS), 80 (HTTP redirect) |
| Nginx image | nginx:alpine |

---

## TLS Handshake Stages (Wireshark)

| Stage | What happens |
|---|---|
| Client Hello | Browser sends supported TLS versions, cipher suites, random value |
| Server Hello | Server selects TLSv1.3 and cipher suite |
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

## All Labs Completed — Network Security Module

| Lab | Topic |
|---|---|
| Lab 1 | Network Topology, OSI/TCP-IP Models, Cisco Packet Tracer |
| Lab 2-4 | Java Socket Programming, HTTP Client, Echo Server |
| Lab 3 | ACL — 10 stages (Standard, Extended, IPv6, SPD) |
| Lab 3.1 | CIA Triad & Cryptography Research (NIST) |
| Lab 3.2 | OpenSSL Practice & UI Cryptography Exercises |
| Lab 4 | PKI Lifecycle with OpenSSL (Ed25519) |
| Lab 5.1 | Telnet vs SSH Traffic Analysis (tshark, Ubuntu VMs) |
| Lab 5.2 | ARP Packet Analysis |
| Lab 5 VPN | Gateway-to-Gateway IPSec VPN (strongSwan, IKEv2) |
| Lab 7 | IPSec VPN Full Report |
| Lab 8 | ICMP Traffic Filtering ACL (Cisco Packet Tracer) |
| Lab 8.1 | Linux sysctl Network Hardening |
| Lab 8.2 | Linux sysctl Network Hardening Part 2 |
| Pre-Lab 9 | Docker Introduction & Container Networking |
| Lab 9 | Nginx TLS/SSL + Docker + Wireshark (this repo) |

---

*Vizja University — Network Security Module — Mehmet Surmeli 63452*
