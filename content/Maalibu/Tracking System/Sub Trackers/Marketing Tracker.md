### Section 1: Ad Performance Metrics (The "Spend")

**Columns :** `Amount Spent`, `Frequency`, `Impressions`, [^1]`CPM`, `Clicks (ALL)`, `Link Clicks`.

These are foundational advertising metrics. They tell you how much you're spending and how efficiently the ad platform (Meta) is delivering your ads.

- This data comes directly from the ad platform(Meta).

**Automation:** 
- Using a tool like `Make` or `Pabbly` to pull the previous day's summary from the Facebook Ads API and populate these columns.

**Benefit:**
- This allows team to spot platform-level issues instantly. 
- If a client's `CPM` (Cost Per Thousand Impressions) doubles overnight, you know there might be an issue with the ad creative or audience competition before you even look at lead numbers. This enables the proactive management your clients are paying for.

### Section 2: Lead Generation Metrics (The First "Result")

**Columns:** `New Leads`, `LP Conversion %`, `CPL (Cost Per Lead)`

**This section answers the most basic question:** "Are the ads generating leads at an acceptable cost?"

- `New Leads` is the first metric that comes directly from `Go High Level`.    

**Automation:** 
- You'll create a workflow with a trigger for `Form Submitted` or `Survey Submitted` in your client's GHL account. Each time this happens, the automation finds today's date in the sheet and increments the `New Leads` column by one.

**Benefit:** 
- This gives a real-time CPL. If you spent $100 yesterday and the sheet shows 10 new leads from GHL, you instantly know your CPL was $10. If that's above the client's KPI, your team can immediately investigate the ad creative or landing page (`LP Conversion %`).

### **Section 3: Sales Funnel Metrics (The "Quality of the Result")**

**Columns:** `Demos Booked`, `Cost Per Demo Booked`, `Lead To Booking %`, `Qualified Leads`, `Cancelled / No Showed`.

 This section measures the quality of the leads being generated. A low CPL is meaningless if none of the leads book a call or are qualified.

**Automation for `Demos Booked`:** 
- The trigger is `Appointment Status` changing to 'Confirmed' in a specific GHL calendar. The automation then finds the current date and increments this column.

**Automation for `Qualified Leads`:** 
- This depends on your team's process. The trigger can be adding a "qualified" `Contact Tag` or moving an `Opportunity Stage`.

**Benefit:** 
- This allows you to diagnose deeper issues. For instance, if `CPL` is good but `Cost Per Demo Booked` is terrible, you know the problem isn't the ad itself but likely the lead quality or the follow-up process. As the "Basic Tracking Systems" document explains, this lets you identify the real constraint.

### **Section 4: Revenue & ROI Metrics (The "Ultimate Result")**

**Columns:** `Sales`, `Contracted Revenue`, `CPA (Cost Per Acquisition)`, `Rev ROAS (Revenue Return on Ad Spend)`.

This is the bottom line. It connects the daily ad spend directly to the revenue it generated for your client.

This automation relies on the **Opportunities** feature within Go High Level.

**Automation:** 
- The trigger is the `Opportunity Stage Changed` to 'Won'. The workflow then takes the 'Opportunity Value' from GHL and adds it to the `Contracted Revenue` column for that day. `Sales` would be incremented by one.

**Benefit:** 
- This is the most important data for proving your value. You can confidently go to a client and say, "On the 7th of April, we spent $100 on your ads, which directly resulted in 3 sales and $18,000 of contracted revenue, giving you a 180x return on that day's spend."

[^1]: **CPM** stands for **Cost Per Mille** (Mille is Latin for "thousand"), or more simply, **Cost Per Thousand Impressions**. It is the price you pay to show your ad to 1,000 people. If you spend $100 on ads and get 10,000 impressions (views), your CPM is $10. It's a standard metric used to measure the cost of advertising visibility on a given platform. For Maalibu Sphere, tracking CPM is important because a sudden spike can be an early warning that your client's ad costs are rising.
