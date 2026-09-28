---
title: First Mile System Scales Automated Route Assignment with Flare Integration Using Kafka
type: Case Study
year: 2024
tags: [Logistics, Kafka, AWS]
image: /case_study/first_mile_case_study.png
excerpt: The First Mile system, a high-volume logistics platform, automated its route assignment process for Pickup Requests (PURs) by integrating with Flare, a geospatial routing service. Prior to the integration, the manual effort required by team leads (TLs) to assign PURs to routes constrained operational scalability and introduced human dependency into time-critical processes.

---

## **Executive Summary**

The First Mile system, a high-volume logistics platform, automated its route assignment process for Pickup Requests (PURs) by integrating with Flare, a geospatial routing service. Prior to the integration, the manual effort required by team leads (TLs) to assign PURs to routes constrained operational scalability and introduced human dependency into time-critical processes. By leveraging a Kafka-based asynchronous messaging system, the First Mile system enabled real-time, scalable, and fully automated route assignments. The integration allowed the system to seamlessly process tens of thousands of PURs per day with minimal human intervention, improving throughput and reducing dispatch delays.

---

## **Customer Challenge**

The First Mile system processes hundreds of thousands of shipments daily. In the first mile (FM) of the logistics chain, team leads manually assigned PURs to routes based on static Excel-based mappings and field knowledge. This manual process was inherently slow, limited in scalability, prone to human error, and heavily dependent on individual expertise.

Key challenges included:

- **Scale Limitations:** Manual assignment processes could not keep up with growing shipment volumes.
- **Operational Bottlenecks:** Delays in assigning routes hindered timely dispatch creation and reduced rider efficiency.
- **Human Dependency:** Required constant monitoring and intervention by TLs, limiting process automation.
- **Data Fragmentation:** Route-to-rider mapping was maintained outside the system, leading to inconsistencies and operational silos.

The First Mile system sought to build a **scalable, real-time, and fully automated solution** that could dynamically assign PURs to the right routes without human involvement.

---

## **Why Flare Integration?**

The Flare service provides advanced geospatial capabilities, enabling dynamic assignment of routes based on the latitude and longitude of the pickup warehouse. Integrating Flare allowed the First Mile system to:

- Automate the route assignment process.
- Achieve real-time decision-making through event-driven architecture.
- Scale to support **high-volume, concurrent PUR creation and assignment.**
- Reduce manual errors and improve operational accuracy.

---

## **Solution**

The First Mile system developed an **event-driven integration** with Flare using Apache Kafka as the core messaging system.

### **Solution Highlights:**

- **Asynchronous Kafka Communication:**
    - On PUR creation, the First Mile system produces a Kafka event containing pickup details.
    - Flare consumes this event, processes geospatial logic, and responds with the appropriate RouteID and RiderID via a Kafka topic.
- **Real-Time Processing:**
    - Kafka consumers in the First Mile system instantly update the database with the assigned route.
    - PURs are automatically associated with existing dispatches or queued for new dispatch creation.
- **Automated Dispatching APIs:**
    - New APIs provide TLs with real-time visibility of open PURs grouped by RouteID.
    - The system recommends riders and vehicles based on historical dispatches and live attendance status, fetched from the attendance management system.
- **Scalable Design:**
    - Kafka decouples the First Mile system and Flare, supporting **high message throughput** without system strain.
    - Redis caching and PostgreSQL optimizations ensure fast API response times even under load.

---

## **Benefits**

### **1. Massive Scale Handling**

- Supports **processing of tens of thousands of PURs per day** without bottlenecks.
- Asynchronous pipelines via Kafka allow the system to effortlessly scale to future growth.

### **2. Complete Process Automation**

- Route assignment is now fully automated with no human intervention required.
- Real-time rider and vehicle suggestions further streamline the dispatch process.

### **3. Improved Rider Efficiency**

- Automated dispatch assignment minimizes rider idle time.
- TLs can make quick, data-driven decisions based on system-suggested routes.

### **4. Reduced Operational Load**

- Freed up significant manual bandwidth from TLs, allowing them to focus on escalations and exceptions instead of routine assignments.

### **5. Enhanced Data Accuracy**

- Automated mappings eliminated human errors in PUR-to-route assignments.
- Real-time syncing with the attendance system ensures accurate rider availability.

---

## **Looking Ahead**

The First Mile system plans to further enhance this solution by:

- Introducing predictive dispatching based on package volume forecasts.
- Integrating rider shift patterns to proactively suggest optimal load balancing.
- Extending automation to the Last Mile (LM) operations for end-to-end efficiency.

---

## **About First Mile System**

The First Mile system is a logistics platform specializing in First Mile operations, enabling efficient shipment pickups across multiple distribution centers. By focusing on scalable solutions and real-time automation, the First Mile system handles high daily shipment volumes for leading logistics networks.