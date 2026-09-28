---
title: Building a Scalable Appointment Ingestion Platform for a Healthcare Provider
type: Case Study
year: 2024
tags: [Healthcare, AWS]
image: /case_study/case-study1.jpg
excerpt: A leading U.S.-based healthcare provider needed to consolidate high-volume appointment data from a growing network of clinics, diagnostic labs, and telehealth platforms. This data arrived via both file uploads and API integrations, and existing ingestion systems were brittle, slow, and costly.

---

### **Executive Summary**

A leading U.S.-based healthcare provider needed to consolidate high-volume appointment data from a growing network of clinics, diagnostic labs, and telehealth platforms. This data arrived via both file uploads and API integrations, and existing ingestion systems were brittle, slow, and costly.

By leveraging AWS serverless architecture, the provider built a scalable, resilient ingestion platform that supports file-based and real-time API data ingestion. A critical innovation was the introduction of changelog-based deduplication logic that reduced database write operations by over **65%**, leading to faster processing, lower costs, and better data reliability.

---

### **Customer Profile**

The healthcare provider operates across 20+ U.S. states, managing millions of appointments monthly across physical clinics and virtual care channels. Accurate and timely availability of this data is key to managing resource allocation, patient communications, and billing workflows.

---

### **The Challenge**

### **1. Fragmented Data Sources**

• Partners sent data either via S3 uploads (CSV/JSON) or via APIs that needed polling.
• No standardization; custom formats and structures were the norm.

### **2. High Volume and Velocity**

• 2M+ appointments monthly, spiking to 5,000+ per minute during working hours.
• Existing systems built on EC2 and cron jobs couldn't scale to meet peak demand.

### **3. Redundant and Repetitive Data**

• S3 files were often re-uploaded with the same or slightly modified content (e.g., new reschedules or cancellations).
• This led to **duplicate inserts** and bloated the database, affecting query latency and storage costs.

### **4. Manual Monitoring and Lack of Error Resilience**

• Failures in ingestion went unnoticed until downstream impact was observed.
• No changelog or visibility into which records changed across file versions.

---

### **Why AWS**

AWS enabled the provider to:

• Build an **event-driven, serverless ingestion pipeline**.
• Introduce **deduplication and changelog logic** without complex orchestration tools.
• Scale ingestion and processing independently with **Amazon S3, SQS, Lambda, and Aurora**.
• Gain observability and reliability with **CloudWatch**, **SNS**, and **DLQs**.

---

### **The Solution**

The team designed a **hybrid ingestion pipeline** to support file uploads and API polling, with an intelligent changelog system to prevent redundant writes.

### **1. File-Based Ingestion with Changelog Logic**

• Partners uploaded files to **Amazon S3**, organized by partner ID and date.
• An **S3 event trigger** invoked a Lambda function on every upload.

### **✳️ Changelog Logic Implementation**

• **Step 1:** File hash or version metadata was compared against previously ingested versions (stored in DynamoDB).
• **Step 2:** File contents were parsed, and each record's unique ID and payload hash were checked against a changelog table in **Amazon Aurora**.
• **Step 3:** Only **new or changed records** were passed downstream for processing and insertion.
• **Step 4:** A record of this file version and processed records was stored for auditing and replay.

> Impact:
> 

> Reduced Aurora writes by 65% by avoiding inserts of identical or previously ingested records.
> 

> Resulted in better RDS IOPS, lower DB CPU utilization, and lower storage costs.
> 

### **2. API-Based Ingestion with Polling and Deduplication**

- For partners using APIs, ingestion was driven by **Amazon EventBridge** on a schedule.
- A Lambda function fetched new data and used the same changelog logic to detect and filter out already-processed records before enqueuing to SQS.

### **3. Processing Pipeline**

- Validated and enriched data was consumed by Lambda workers from **Amazon SQS**.
- Clean records were written to **Amazon Aurora PostgreSQL**.
- For analytics and reporting, select fields were also streamed to **Amazon Redshift** via **Kinesis Firehose**.

---

### **Architecture Overview**

**File-Based Path:**

S3 → Lambda (Changelog Filter) → SQS → Lambda Worker → Aurora + Redshift

**API-Based Path:**

EventBridge → Lambda Poller (Changelog Filter) → SQS → Lambda Worker → Aurora + Redshift

**Support Systems:**

- DynamoDB (File version metadata)
- Aurora (Changelog + Appointments)
- CloudWatch, DLQ, SNS for observability and alerting

---

### **Results**

| **Metric** | **Before** | **After (With AWS & Changelog Logic)** |
| --- | --- | --- |
| Avg. Ingestion Latency | 4–6 hours | < 10 minutes |
| DB Write Volume | 100% of incoming | Reduced by 65% |
| CPU Utilization (Aurora) | ~80% peak | ~40% peak |
| Partner Onboarding Time | 2–4 weeks | 2–3 days |
| Data Loss Incidents | Frequent | Near-zero (DLQ + Alerts) |

### **Key Benefits**

• **Efficiency**: Intelligent changelog detection optimized DB utilization and cut processing time in half.
• **Scalability**: Serverless ingestion scaled horizontally without ops overhead.
• **Reliability**: Real-time alerts and retries reduced silent ingestion failures.
• **Cost Savings**: Reduced IOPS, storage, and Lambda invocation duration by avoiding unnecessary reprocessing.

---

### **Lessons Learned**

• **Every ingestion needs a changelog**: Even batch file systems must track deltas to optimize downstream performance.
• **Immutable storage + versioning** is key: S3's versioned folders and DynamoDB helped track state without adding complexity.
• **Replayability and observability** are not optional at scale.

---

### **Next Steps**

• Introduce **AWS Glue Catalog** for schema evolution and discoverability.
• Use **Amazon SageMaker** to detect appointment anomalies like surge booking or repeated cancellations.
• Automate schema validation and onboarding with **Step Functions** and Lambda.

---

### **About the Customer**

This healthcare provider is on a mission to improve healthcare outcomes using digital-first approaches. Their tech-forward culture enables them to adopt innovative solutions quickly and efficiently across distributed teams and patient care locations.