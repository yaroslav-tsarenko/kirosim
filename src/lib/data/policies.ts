/** Customer-facing legal policies, transcribed from the master text in
 *  addons/kirosim-policies.md. Only the content between each
 *  PUBLIC_POLICY_START / PUBLIC_POLICY_END marker is included — the YAML
 *  front matter, document map and internal implementation appendix are marked
 *  "not customer-facing content" and are intentionally omitted. */

/** A block of policy content. A plain string is a paragraph (supporting inline
 *  `**bold**` and `[label](url)` markup); objects render as a bullet list or a
 *  table. */
export type PolicyBlock =
  | string
  | { list: string[] }
  | { table: { head: string[]; rows: string[][] } };

export interface PolicySection {
  heading: string;
  blocks: PolicyBlock[];
}

export interface Policy {
  slug: string;
  title: string;
  /** Short label for nav/footer where the full title is too long. */
  shortTitle: string;
  lastUpdated: string;
  /** One-line summary for the legal index and metadata description. */
  summary: string;
  sections: PolicySection[];
}

const LAST_UPDATED = "17 September 2026";

export const policies: Policy[] = [
  {
    slug: "terms",
    title: "Terms & Conditions",
    shortTitle: "Terms",
    lastUpdated: LAST_UPDATED,
    summary:
      "The contract governing purchases through kirosim.com and use of the travel eSIM services sold by BRIGHTCORE ENTERTAINMENT LTD.",
    sections: [
      {
        heading: "About Kirosim and these Terms",
        blocks: [
          "Kirosim is operated by **BRIGHTCORE ENTERTAINMENT LTD**, company number **17357935**, with its registered office at **Dept 6957, 196 High Road, Wood Green, London, United Kingdom, N22 8HH**. In these Terms, “Kirosim”, “we”, “us” and “our” mean that company. Contact us at **info@kirosim.com**.",
          "These Terms govern purchases through **kirosim.com** and use of our travel eSIM services. An “eSIM” is a digital SIM profile installed on a compatible device. A “Plan” is the package of mobile connectivity purchased for that profile, with the destinations, allowance, duration and features specified before payment. A “Top-up” is an additional package purchased for an eligible eSIM.",
          "Our [Refund & Cancellation Policy](https://kirosim.com/legal/refund-cancellation), [Digital Delivery & Activation Policy](https://kirosim.com/legal/delivery-activation) and [Acceptable Use & Fair Usage Policy](https://kirosim.com/legal/acceptable-use) form part of your purchase agreement. Our [Privacy Policy](https://kirosim.com/legal/privacy) and [Cookie Policy](https://kirosim.com/legal/cookies) explain how information is handled; accepting these Terms is not consent to optional marketing or tracking.",
          "Read the Plan description and applicable policies before paying. Mandatory consumer rights prevail over these Terms. Subject to those rights, specific Plan details disclosed and agreed before payment prevail over general descriptions where they address the same feature. This does not allow a Plan description to remove the refund protection expressly offered in our Refund & Cancellation Policy.",
        ],
      },
      {
        heading: "Eligibility and geographic restrictions",
        blocks: [
          "You must be at least **18 years old** to create an account, purchase or use our services. You must provide accurate information and be authorised to use the payment method you select.",
          "Kirosim does not accept purchases from customers located in or resident in the following countries, and our services must not be used in these countries:",
          {
            list: [
              "Afghanistan",
              "Belarus",
              "Central African Republic",
              "Cuba",
              "Democratic Republic of the Congo",
              "Haiti",
              "Iran",
              "Iraq",
              "Mali",
              "Myanmar (Burma)",
              "North Korea",
              "Russia",
              "Somalia",
              "South Sudan",
              "Sudan",
              "Syria",
              "Venezuela",
              "Yemen",
              "Zimbabwe",
            ],
          },
          "These are Kirosim service restrictions. The list does not mean that every listed country is subject to identical legal sanctions. Do not conceal your location, residence or transaction details to bypass these restrictions. We may request proportionate information to check eligibility or decline a transaction that cannot lawfully or legitimately be fulfilled.",
          "Availability for purchase outside these countries does not mean that every destination is covered. Connectivity is available only in the destinations included in your particular Plan. Regional and global Plans remain subject to the restrictions above.",
          "We may amend restrictions for future purchases. If a change makes an existing purchase unavailable, we will explain the effect and address any replacement or refund due under the Refund & Cancellation Policy and applicable law. A restriction does not automatically permit us to retain money for services we cannot supply.",
        ],
      },
      {
        heading: "Accounts and security",
        blocks: [
          "Where an account is required, keep its details accurate and its credentials secure. Notify us promptly if you suspect unauthorised access or an unauthorised purchase. You are responsible for activity you authorise, but these Terms do not make you automatically responsible for every unauthorised transaction.",
          "Do not share access in a way that exposes another person's information or allows prohibited use. We may take reasonable steps to verify account or order ownership before providing access to eSIM credentials, changing an email address or discussing an order.",
          "Closing an account does not itself cancel a Plan, stop its validity period or create a refund entitlement. Contact us before closure if you need access to an active Plan or assistance with an outstanding order. Records that must be retained are handled under our Privacy Policy.",
        ],
      },
      {
        heading: "Device compatibility and service features",
        blocks: [
          "Before ordering, check that your device supports eSIM, is unlocked for use with other networks and is compatible with the selected Plan. Model variants, country of manufacture, operating system and device restrictions can affect compatibility. You will need an internet connection to download and install the profile.",
          "The Plan description specifies the included data, validity, destinations and other features. Do not assume that a Plan includes a telephone number, conventional calls, SMS, hotspot use or a particular network generation unless stated. A data-only Plan does not provide conventional voice or SMS services.",
          "An eSIM does not replace reliable access to emergency communications. Do not rely on a Kirosim Plan as your sole means of contacting emergency services.",
          "Keeping your usual SIM active may result in charges from your existing mobile provider, including for calls, messages or data roaming. Kirosim's price covers the purchased Plan, not charges independently imposed on your other SIM or account.",
        ],
      },
      {
        heading: "Orders and contract formation",
        blocks: [
          "Check the destination, duration, allowance, currency, compatibility information and total price before submitting your order. You place an order by completing checkout with an obligation to pay. We accept it when we send a confirmation that expressly accepts the order or make the purchased eSIM available, whichever happens first. An automated payment receipt or order acknowledgement alone is not acceptance unless it says so.",
          "We may decline an order before acceptance if it cannot be supplied, payment fails, the customer is ineligible or there are reasonable concerns about fraud or unlawful use. If payment has been collected for an order we decline, we will arrange a refund without undue delay, subject to any legal restriction on returning funds.",
          "If a material pricing or description error is discovered, we will explain it and seek your agreement to any proposed correction, or cancel and refund an order that cannot lawfully be fulfilled on the agreed basis. We will not impose a higher price after payment without your agreement.",
        ],
      },
      {
        heading: "Prices and payment",
        blocks: [
          "We accept **Visa and Mastercard**. Purchases are available in **EUR, GBP and USD**. The checkout identifies the currency and total amount payable before you commit to payment. Any applicable mandatory charge must be included or clearly disclosed before the order is placed.",
          "BRIGHTCORE ENTERTAINMENT LTD is not currently VAT-registered. This statement does not represent that every cross-border transaction is exempt from all applicable taxes. Any tax legally chargeable on your order will be handled as required by law and reflected in the amount disclosed before payment.",
          "Your card issuer may apply currency conversion or other charges under its agreement with you. Those charges are separate from our displayed price. We do not control the issuer's exchange rate.",
          "Payment must be successfully completed before fulfilment. A temporary card authorisation is not necessarily a completed charge. Contact us if you believe you have been charged twice or charged an incorrect amount.",
          "Plans are prepaid, one-off purchases. They do not automatically renew. A Top-up requires a separate purchase and is available only where offered for the relevant eSIM. We will not charge you for additional allowances without your authorisation.",
        ],
      },
      {
        heading: "Delivery, installation and validity",
        blocks: [
          "eSIMs are delivered electronically, with no physical SIM or postal shipment. Following successful payment and order processing, installation credentials and instructions are made available through the order or account interface and sent to the email address used for the purchase.",
          "**The Plan's validity period begins when the eSIM is successfully installed. It does not wait for your arrival at the destination, first network connection or first data use.** Viewing a QR code or receiving an email is not installation.",
          "Install only when you are ready for the validity period to begin. Once started, the period runs continuously and does not pause if you switch off your device, disable or delete the profile, leave the covered area or do not use the allowance.",
          "Any deadline for installing a purchased eSIM must be disclosed before payment and in the order information. We will not retrospectively impose an undisclosed installation deadline on an existing purchase. Contact us before buying substantially in advance if the available installation window is unclear.",
          "The [Digital Delivery & Activation Policy](https://kirosim.com/legal/delivery-activation) explains delivery problems, profile security, installation and Top-ups in more detail.",
        ],
      },
      {
        heading: "Coverage, performance and Plan limits",
        blocks: [
          "Mobile connectivity depends on local network availability, device capabilities, buildings, terrain, network load, maintenance and other technical conditions. Coverage maps and network-generation indicators do not guarantee a particular speed or an uninterrupted signal at every location.",
          "These technical limitations do not excuse failure to supply the service as described or remove remedies required by law. Tell us promptly about a problem so that we can investigate while the relevant conditions can still be checked.",
          "A fixed-data Plan ends when its allowance is exhausted or its validity expires, whichever occurs first, unless its description expressly provides otherwise. Unused allowance is not carried forward unless the Plan explicitly includes that feature.",
          "Where an unlimited Plan is offered, any fair-use threshold, speed reduction, hotspot limit or other material restriction must be stated before purchase. We do not reserve a general right to introduce undisclosed limits into an existing Plan.",
        ],
      },
      {
        heading: "Cancellation, refunds and service problems",
        blocks: [
          "Our [Refund & Cancellation Policy](https://kirosim.com/legal/refund-cancellation) provides a 14-calendar-day change-of-mind refund for an eSIM that remains uninstalled and unused, and explains separate remedies for faulty, unavailable or undelivered services.",
          "Installation ends eligibility for that voluntary uninstalled-eSIM offer. It does not automatically extinguish statutory cancellation rights or rights relating to a defective service. Any legally required request to start a service early or acknowledgement concerning cancellation must be obtained separately and validly.",
        ],
      },
      {
        heading: "Acceptable use and suspension",
        blocks: [
          "Use the service lawfully and in accordance with our [Acceptable Use & Fair Usage Policy](https://kirosim.com/legal/acceptable-use). We may restrict or suspend the affected service where reasonably necessary to address a security threat, serious misuse, non-payment, a legal requirement or a material breach of the agreement.",
          "Where practicable, we will explain the reason and provide an opportunity to resolve a remediable issue. We may act immediately where advance notice would create a security risk, facilitate unlawful activity or be prohibited by law. Any action should be proportionate to the issue.",
          "You may challenge a restriction by contacting us. Suspension does not automatically forfeit your payment. Any refund, deduction or other financial consequence must be supported by the agreement and applicable law.",
        ],
      },
      {
        heading: "Intellectual property",
        blocks: [
          "Our website, branding, text and other materials are owned by us or used with permission. You may use the website and supplied instructions for legitimate personal purposes connected with the service. You must not copy or commercially exploit our branding, reproduce substantial website content or falsely imply an association with Kirosim without permission, except where the law permits.",
          "You retain rights in material you send us. You allow us to use that material only as reasonably needed to handle the relevant request, deliver the service and meet legal obligations.",
        ],
      },
      {
        heading: "Our responsibility to you",
        blocks: [
          "We are responsible for supplying what we have agreed to provide and for exercising reasonable care and skill. If we breach the agreement, we are responsible for foreseeable loss caused by that breach, subject to applicable law. Loss is foreseeable if it was an obvious consequence or was contemplated by both parties when the contract was made.",
          "The service is offered for personal travel use. To the extent permitted by law, we are not responsible for business losses such as lost profits, business opportunities or business interruption arising from use outside that purpose.",
          "We are not responsible for a problem to the extent it is caused by your failure to follow clear and accurate instructions, incompatible equipment contrary to accurate compatibility information, or unauthorised changes you make. This does not exclude responsibility for our own errors, misleading information or failure to provide an appropriate remedy.",
          "Nothing in these Terms excludes or limits liability for fraud, fraudulent misrepresentation, death or personal injury caused by negligence, or any liability or consumer right that cannot lawfully be excluded or limited.",
          "If an event outside our reasonable control disrupts fulfilment, we will take reasonable steps to reduce its effect and explain the options available. Such an event does not automatically remove your right to end the affected contract or receive a refund where the law provides one.",
        ],
      },
      {
        heading: "Changes and ending services",
        blocks: [
          "The version accepted at purchase governs that order. We may update terms for future purchases. A change to an existing agreement must have a valid legal or contractual basis; we will give appropriate notice and any cancellation or refund option required by law where it materially disadvantages you.",
          "If we discontinue a purchased service before it has been provided as agreed, we will offer an appropriate remedy. You do not have to accept a materially different replacement instead of a refund to which you are entitled.",
        ],
      },
      {
        heading: "Governing law and disputes",
        blocks: [
          "These Terms are governed by the laws of England and Wales. If you are a consumer, this choice does not deprive you of mandatory protections available under the law of your habitual residence where those protections apply.",
          "The courts of England and Wales may hear disputes, without preventing a consumer from bringing proceedings in another court available under mandatory law, including the courts of their home jurisdiction where applicable.",
          "Please contact **info@kirosim.com** if a problem arises. Our [Complaints Handling Policy](https://kirosim.com/legal/complaints) explains the process. You do not have to complete that process before exercising a legal right or meeting an external claim deadline.",
        ],
      },
      {
        heading: "General provisions",
        blocks: [
          "If a provision is unenforceable, the remaining provisions continue to apply so far as they can operate fairly and lawfully. A delay in enforcing a right is not a waiver of it. Any permitted transfer of our rights or obligations must not reduce your contractual or statutory protection.",
          "These Terms and the information incorporated into your purchase form the agreement concerning that purchase. Nothing in this clause excludes liability for misrepresentation or removes binding pre-contract information or promises protected by law.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    shortTitle: "Privacy",
    lastUpdated: LAST_UPDATED,
    summary:
      "What personal information BRIGHTCORE ENTERTAINMENT LTD processes, why, the legal bases, sharing, retention and your rights.",
    sections: [
      {
        heading: "Who is responsible for your information",
        blocks: [
          "**BRIGHTCORE ENTERTAINMENT LTD**, company number **17357935**, trading as **Kirosim**, is responsible as controller for the personal information it processes in operating **kirosim.com**, administering customer relationships and handling purchases and enquiries.",
          "Our registered office is **Dept 6957, 196 High Road, Wood Green, London, United Kingdom, N22 8HH**. For privacy questions or requests, contact **info@kirosim.com** and indicate that your message concerns privacy.",
          "Connectivity and payment organisations may also process information for their own legal and operational purposes. Their role depends on the activity: not every organisation involved acts solely on our instructions.",
        ],
      },
      {
        heading: "Information covered by this Policy",
        blocks: [
          "The information relevant to your interaction may include:",
          {
            list: [
              "**Contact and account information:** your email address, name and other details you provide, account identifiers, authentication records and preferences.",
              "**Order and payment records:** Plan and destination selected, order reference, amount, currency, transaction status, refunds and information needed for billing or transaction verification. Information available to us depends on the payment flow; it may include limited payment-method details and a transaction reference.",
              "**eSIM and service records:** profile identifiers, delivery and installation status, validity, remaining allowance, usage totals and technical status information made available to us for fulfilment and support.",
              "**Website and device information:** IP address, browser and operating-system information, access times, requested pages, errors and security logs generated when interacting with the website.",
              "**Support information:** messages, complaint details and relevant diagnostic information or screenshots you choose to provide.",
              "**Preference and consent records:** cookie choices, marketing choices and records of notices or consents associated with an order.",
            ],
          },
          "This description does not mean that Kirosim receives every category for every user. A network's ability to process connection or location information does not mean that we receive a complete record of your browsing, communications or precise movements.",
          "Do not send full card numbers, card security codes, account passwords or unrelated sensitive information to our support email. If additional verification is necessary, we will explain what information is needed and how to provide it appropriately.",
        ],
      },
      {
        heading: "Where information comes from",
        blocks: [
          "We receive information directly from you when you browse, register, purchase, subscribe to communications or contact us. Technical information may be generated by your interaction with the website. We also receive relevant payment-status and service-status information from organisations involved in processing the transaction or supplying connectivity, and information from a person you authorise to act for you.",
          "We use third-party information only where there is a lawful basis and a relevant operational need. If a new activity requires additional notice, we will provide it when appropriate.",
        ],
      },
      {
        heading: "Purposes and legal bases",
        blocks: [
          {
            table: {
              head: ["Purpose", "Relevant information", "Legal basis where UK or EU GDPR applies"],
              rows: [
                [
                  "Create and administer an account; process a requested purchase",
                  "Contact, account, order and payment-status information",
                  "Steps at your request before a contract and performance of the contract",
                ],
                [
                  "Deliver an eSIM, administer a Plan and resolve a service problem",
                  "Order, profile, installation, allowance and support information",
                  "Performance of the contract",
                ],
                [
                  "Maintain reliable systems and investigate technical faults",
                  "Technical logs and relevant service records",
                  "Legitimate interests in keeping the service secure and functioning; contract where needed to resolve your order",
                ],
                [
                  "Prevent fraud, verify eligibility and protect accounts",
                  "Relevant account, transaction and security information",
                  "Legitimate interests in preventing misuse; legal obligation where a specific law requires a check",
                ],
                [
                  "Keep required accounting records or respond to a lawful demand",
                  "Necessary transaction and correspondence records",
                  "Compliance with legal obligations",
                ],
                [
                  "Handle complaints and establish, exercise or defend legal claims",
                  "Relevant order, service and correspondence records",
                  "Contract, legal obligations or legitimate interests in resolving disputes, as applicable",
                ],
                ["Send optional promotional email", "Email address and marketing preferences", "Consent"],
                [
                  "Use optional website analytics or marketing technologies, if enabled",
                  "Identifiers and interaction information described in the cookie controls",
                  "Consent",
                ],
              ],
            },
          },
          "When relying on legitimate interests, we consider the impact on your rights and use information proportionately. We do not treat every business purpose as automatically overriding your privacy.",
          "Information needed to take payment, fulfil an order or verify eligibility is necessary for the relevant transaction. If you do not provide it, we may be unable to complete the purchase or resolve the request. Optional marketing and optional tracking are not conditions of buying a Plan.",
        ],
      },
      {
        heading: "Marketing and service messages",
        blocks: [
          "If you opt in to promotional emails, you can unsubscribe through the link in those messages or by emailing **info@kirosim.com**. Withdrawal of consent does not affect processing that was lawful before withdrawal.",
          "Order confirmations, installation instructions, security notices and messages about an active complaint are service communications. Unsubscribing from marketing does not prevent necessary messages about your purchase.",
          "We may retain a minimal suppression record to respect an unsubscribe request rather than inadvertently adding the address back to a mailing list.",
        ],
      },
      {
        heading: "Who receives information",
        blocks: [
          "We disclose relevant information only to the extent needed for the purpose concerned. Recipient categories include:",
          {
            list: [
              "payment-processing organisations, banks and card networks involved in payment, authentication, refunds and disputes;",
              "eSIM provisioning organisations and mobile connectivity networks involved in delivering and operating the purchased service;",
              "infrastructure, hosting, data-storage, security and technical support providers supporting the website and its operation;",
              "email-delivery and customer-support providers where used to send service messages or handle requests;",
              "analytics or marketing providers only where those optional functions are used with the required consent;",
              "professional advisers where necessary for accounting, legal advice or a dispute; and",
              "courts, regulators, law-enforcement bodies or other authorised recipients where disclosure is legally required or otherwise lawful and necessary.",
            ],
          },
          "If the business is reorganised or transferred, relevant information may be disclosed under appropriate confidentiality and data-protection arrangements. We will explain a material change in responsibility for your information where required.",
          "Service providers acting on our behalf must process information under appropriate instructions and safeguards. Independent controllers remain responsible for their own processing. Contact us for further information about recipients relevant to your data.",
        ],
      },
      {
        heading: "International processing",
        blocks: [
          "Travel connectivity may involve processing in the country where a Plan is used, and supporting infrastructure may involve processing outside the United Kingdom or European Economic Area. The locations involved depend on the destination and service arrangements.",
          "Where a transfer is subject to UK or EU transfer restrictions, we must have a lawful transfer basis. Depending on the destination and arrangement, this may be an applicable adequacy decision or approved contractual safeguards, together with any required assessment and supplementary measures. We do not treat the purchase of an international Plan as blanket consent to all overseas transfers.",
          "You may contact **info@kirosim.com** for information about the locations and transfer safeguards relevant to your personal information, including a copy or description of applicable safeguards, subject to lawful redactions.",
        ],
      },
      {
        heading: "Retention",
        blocks: [
          "We retain identifiable information only for as long as needed for its purpose and applicable legal requirements. Retention is assessed by record type:",
          {
            list: [
              "account information is needed while the account is active and for a proportionate period to complete closure, address unresolved matters and prevent misuse;",
              "order, payment and refund records are retained for applicable accounting, tax, dispute and legal-claim requirements;",
              "service and diagnostic records are retained according to their necessity for Plan administration, fault investigation and related disputes;",
              "support correspondence is retained according to the issue, its resolution and any continuing legal need;",
              "consent and suppression records are retained as needed to evidence and respect your choices; and",
              "security logs are retained according to the incident-detection and investigation need, with longer preservation where a specific incident or legal obligation justifies it.",
            ],
          },
          "The relevant criteria include the length of the customer relationship, whether an issue remains open, applicable statutory periods and whether the purpose can be achieved with anonymised data. We do not keep all categories indefinitely simply because an account once existed. At the end of the applicable period, records should be deleted or irreversibly anonymised; backup copies are subject to controlled retention and restricted use.",
        ],
      },
      {
        heading: "Security",
        blocks: [
          "We use measures appropriate to the nature of the information and the risks of processing. Access should be limited to people and organisations that need it for the relevant function. No online service can promise absolute security.",
          "Protect your account credentials and eSIM installation details. If you suspect a data-security issue, contact **info@kirosim.com** promptly without including unnecessary sensitive information. Where a breach triggers a legal notification obligation, we will provide the required notification.",
        ],
      },
      {
        heading: "Your rights",
        blocks: [
          "Depending on applicable law and the circumstances, you may request access to your personal information, correction of inaccuracies, erasure, restriction of processing or a portable copy of information you provided. You may withdraw consent at any time.",
          "**You have the right to object to processing based on legitimate interests on grounds relating to your situation. You also have the right to object to direct marketing at any time.**",
          "Contact **info@kirosim.com** to exercise a right. We may ask for proportionate information to verify identity and protect another person's information. Requests are normally handled without charge and within one calendar month where UK or EU GDPR applies. Any lawful extension, clarification requirement or permitted fee or refusal will be explained within the applicable timeframe.",
          "Rights are not absolute. For example, a deletion request does not necessarily require deletion of records that must be kept by law or are needed for a legal claim. We will explain any relevant limitation.",
          "You may complain to the [UK Information Commissioner's Office](https://ico.org.uk/make-a-complaint/) or another competent data-protection authority, including an authority in your country of residence where applicable. You do not have to complain to us first.",
        ],
      },
      {
        heading: "Automated checks",
        blocks: [
          "Payment authentication, security screening and eligibility checks may involve automated tools. If an automated check prevents you from completing or accessing an order, you may contact us to explain your circumstances and request a review.",
          "Where processing involves a solely automated decision with a legal or similarly significant effect, we will provide the information and safeguards required by applicable law, including applicable rights to challenge the decision and obtain human intervention. This clause is not consent to such decision-making.",
        ],
      },
      {
        heading: "Children and policy changes",
        blocks: [
          "Our service is intended for people aged 18 or over. If you believe a person under 18 has provided personal information to us in connection with an account or purchase, please contact us so that we can investigate and take appropriate action, including retaining only what is needed to resolve the matter or comply with law.",
          "We may update this Policy to reflect changes in our activities or legal requirements. We will publish the revised version and provide additional notice where a material change requires it. A new policy does not retrospectively create consent for a new use of your information.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    shortTitle: "Cookies",
    lastUpdated: LAST_UPDATED,
    summary:
      "The cookies and similar technologies used on kirosim.com, which are necessary or optional, and how to control them.",
    sections: [
      {
        heading: "About this Policy",
        blocks: [
          "This Policy explains cookies and similar technologies used in connection with **kirosim.com**, operated by **BRIGHTCORE ENTERTAINMENT LTD**, company number **17357935**, at **Dept 6957, 196 High Road, Wood Green, London, United Kingdom, N22 8HH**. Contact **info@kirosim.com** with questions.",
          "Read this Policy together with our [Privacy Policy](https://kirosim.com/legal/privacy), which explains the handling of personal information, recipients, international processing and your rights.",
        ],
      },
      {
        heading: "Cookies and similar technologies",
        blocks: [
          "Cookies are small pieces of information stored on your device when you use a website. Similar technologies include browser storage and identifiers used by scripts or embedded functions. The same consent approach applies to technologies serving the same purpose, even if they are not technically cookies.",
          "Session cookies usually expire when a browsing session ends. Persistent cookies or storage remain until their expiry or deletion. First-party technologies are associated with the website you visit; third-party technologies may be set by an organisation supplying an embedded function.",
        ],
      },
      {
        heading: "Categories and purposes",
        blocks: [
          "The categories below explain how technologies are classified. They do not mean that every category is active on every page. The website's Cookie Settings must identify the technologies actually in use and their purposes and lifetimes.",
          {
            table: {
              head: ["Category", "Purpose", "Our approach"],
              rows: [
                [
                  "Strictly necessary",
                  "Functions such as keeping a requested login or checkout session secure, maintaining a basket and recording privacy choices",
                  "Used without optional consent only where necessary for the requested service or communication",
                ],
                [
                  "Preferences",
                  "Remembering optional presentation choices or enhanced personalisation",
                  "Consent before use unless the particular function qualifies as strictly necessary for a feature you request",
                ],
                [
                  "Analytics",
                  "Understanding website interactions and performance through optional measurement",
                  "Enabled only after consent",
                ],
                [
                  "Marketing",
                  "Optional advertising measurement, audience functions or tracking across services",
                  "Enabled only after consent",
                ],
              ],
            },
          },
          "We do not treat an optional technology as necessary merely because it is commercially useful. Refusing optional technologies does not prevent you from using the core purchasing service.",
        ],
      },
      {
        heading: "Your choices",
        blocks: [
          "Where optional technologies are offered, the consent interface lets you accept them, reject them or choose by category. Optional categories remain disabled unless you choose to enable them. Continuing to browse or accepting the Terms & Conditions is not cookie consent.",
          "You can reopen **Cookie Settings** through the website footer to change or withdraw your choices. Withdrawal stops future use of the affected optional technologies; it does not retrospectively invalidate processing already carried out lawfully. Where information already stored on your device cannot be removed through those controls, you can delete it through your browser settings.",
          "Choices may be specific to your browser and device. Clearing cookies or switching browsers may remove the stored record of your choice and cause the website to ask again.",
        ],
      },
      {
        heading: "Technology details and duration",
        blocks: [
          "Before an optional technology is enabled, Cookie Settings provides its name or identifying description, purpose, category, duration and whether it is first-party or third-party. Where information is shared, the relevant recipient or sufficiently specific recipient category is also explained.",
          "Retention differs between technologies; this Policy does not assign an invented universal duration. Stored preferences, authentication sessions and analytics identifiers should each have a duration appropriate to their purpose. The details shown in Cookie Settings form part of the information provided under this Policy.",
        ],
      },
      {
        heading: "Browser controls and external services",
        blocks: [
          "Your browser may allow you to inspect, block or delete cookies and other storage. Blocking necessary technologies may prevent login, checkout or other functions you request. Browser controls may operate separately from the site's controls and may not affect every type of similar technology.",
          "Following a link to a separate website makes that website's own privacy and cookie arrangements relevant. An external link does not grant permission for optional tracking on Kirosim before you follow it.",
        ],
      },
      {
        heading: "Updates and contact",
        blocks: [
          "We will update this Policy and the technology details when relevant changes occur. Where a change requires a new choice, we will seek consent before enabling the affected optional use. For help with cookie choices, email **info@kirosim.com**.",
        ],
      },
    ],
  },
  {
    slug: "refund-cancellation",
    title: "Refund & Cancellation Policy",
    shortTitle: "Refund Policy",
    lastUpdated: LAST_UPDATED,
    summary:
      "How the 14-day change-of-mind offer works and the separate remedies for faulty, unavailable or undelivered eSIMs.",
    sections: [
      {
        heading: "Scope and contact",
        blocks: [
          "This Policy applies to purchases made directly from **BRIGHTCORE ENTERTAINMENT LTD**, company number **17357935**, trading as **Kirosim** at **kirosim.com**. Our registered office is **Dept 6957, 196 High Road, Wood Green, London, United Kingdom, N22 8HH**. Send cancellation and refund requests to **info@kirosim.com**.",
          "This Policy distinguishes our commercial change-of-mind offer from mandatory legal rights. Nothing here limits remedies for a service that is undelivered, defective, misdescribed or otherwise not supplied as required by law.",
        ],
      },
      {
        heading: "Our 14-day change-of-mind offer",
        blocks: [
          "You may cancel a purchased eSIM for a full refund if you notify us within **14 calendar days after the contract is concluded** and the eSIM remains **uninstalled and unused** when you give notice. The day after the contract is concluded is day one. Your confirmation identifies the purchase concerned.",
          "This offer covers, for example, a cancelled trip, a mistaken destination or a device-compatibility problem discovered before installation. Receiving installation instructions, opening the order page or viewing a QR code does not by itself make the eSIM installed or used.",
          "After sending a cancellation request, do not install, use, transfer or redeem the affected eSIM. We may verify installation and usage status against relevant service records. If records appear incorrect, you may provide information so that we can review them.",
          "No cancellation administration fee applies to an eligible refund under this offer. The amount returned is the amount actually paid for the cancelled item, taking account of discounts applied to it.",
        ],
      },
      {
        heading: "Installation and statutory cancellation rights",
        blocks: [
          "**Installation starts the Plan's validity immediately**, even if you have not reached the destination or used data. Installation ends eligibility for the commercial offer in the section above. It does not automatically end your legal cancellation rights.",
          "Where the law gives you a cooling-off right, the applicable period and any lawful extension remain available. For UK consumers, a service contract normally has a 14-day cancellation period beginning after the contract is concluded.",
          "If you expressly request that a service begin during that period and then cancel before it is fully performed, we may charge only an amount permitted by law for the service actually supplied before your cancellation. Any charge must be proportionate, properly explained and subject to the required pre-contract information and express request having been provided. We will not impose a charge where the law prohibits it.",
          "For a service contract, the statutory right is lost on full performance during the cancellation period only where the legally required express request or consent and acknowledgement have been obtained. Starting the service is not the same as fully performing it.",
          "If a separately supplied element legally qualifies as digital content, different rules may apply to the loss of the cancellation right when supply begins. We will rely on that exception only where its legal conditions are met, including the necessary prior express consent, acknowledgement and confirmation. Merely emailing a QR code is not treated as a blanket waiver for the entire purchase.",
          "If we did not provide legally required cancellation information, your rights may continue beyond the ordinary period. The commercial conditions in the section above do not shorten any statutory entitlement.",
        ],
      },
      {
        heading: "Undelivered, invalid or faulty eSIMs",
        blocks: [
          "Contact us if installation credentials do not arrive, cannot be accessed, are invalid or fail to provide the purchased service. We will investigate and offer the remedy required by the circumstances and applicable law, which may include correcting fulfilment, restoring service, supplying an appropriate replacement or issuing a full or partial refund.",
          "If we cannot supply the purchased service at all, a full refund will normally be due. If only part of the service was properly supplied, the appropriate remedy will take account of the affected portion, the seriousness of the failure and your legal rights. We will not assess every service-quality issue solely by whether some data was consumed.",
          "Where the law gives you a choice of remedy, we will respect that choice. We will not require acceptance of store credit or a materially different Plan instead of a monetary refund to which you are entitled.",
          "The 14-day change-of-mind period is not a deadline for reporting all faults or exercising all legal remedies.",
        ],
      },
      {
        heading: "Helping us investigate",
        blocks: [
          "Please provide your order reference, purchase email, destination, device model, installation status and a short explanation. Relevant screenshots or error messages can help. Conceal unrelated personal information and never send passwords, full card details or card security codes.",
          "Report connectivity problems promptly, preferably while you are still at the destination, so that the network conditions can be investigated. A delayed report may affect the evidence available but does not automatically cancel a legal right.",
          "Follow reasonable troubleshooting instructions that are relevant and safe. Do not delete the eSIM unless instructed, because deletion may prevent reinstallation or make diagnosis harder. Failure to complete unreasonable or unnecessary troubleshooting is not a basis for withholding a remedy required by law.",
        ],
      },
      {
        heading: "Situations that do not normally qualify for a commercial refund",
        blocks: [
          "Outside the 14-day change-of-mind offer, a discretionary change-of-mind refund is not normally available solely because:",
          {
            list: [
              "travel plans change after installation;",
              "you install early and the validity period expires before or during your trip;",
              "you do not use all the allowance during the agreed validity period;",
              "you buy an unsuitable Plan or use an incompatible or locked device despite accurate pre-purchase information;",
              "you attempt to use the service outside the Plan's coverage or in a restricted country;",
              "you delete a correctly functioning profile or attempt an unsupported transfer; or",
              "you incur separate charges on your ordinary mobile SIM.",
            ],
          },
          "These examples do not exclude a refund where our information was inaccurate, our instructions caused the problem, the service failed to meet the agreement, or applicable law requires another outcome.",
        ],
      },
      {
        heading: "Top-ups, duplicate charges and unauthorised transactions",
        blocks: [
          "For an optional Top-up, we offer the same 14-day change-of-mind period if the Top-up remains unactivated and unused. Its activation and validity rules must be explained before payment. A Top-up that activates immediately on purchase may therefore fall outside this commercial offer; statutory rights remain unaffected.",
          "Tell us promptly about a suspected duplicate charge or unauthorised transaction. We will investigate and return an incorrect charge where established. We may need proportionate verification to protect the account and payment holder. You retain any rights against your card issuer under applicable law or card arrangements.",
          "If a card dispute and a direct refund concern the same charge, tell us so that they can be coordinated and duplicate reimbursement avoided. You are not required to waive a lawful dispute right to have a legitimate complaint considered.",
        ],
      },
      {
        heading: "How refunds are made",
        blocks: [
          "Refunds are made to the original payment method unless you expressly agree otherwise or a legally permitted alternative is necessary because that method cannot receive the refund. You will not be required to accept credit in place of a refund legally due.",
          "For a valid statutory cancellation, we will reimburse you without undue delay and within the applicable legal period; where UK cancellation rules apply, this is normally no later than 14 days after we are informed of your decision to cancel. For other agreed refunds, we will initiate the refund without undue delay and normally within 14 calendar days after confirming the entitlement, or sooner where required by law. An internal review does not extend a statutory deadline.",
          "Refunds are issued in the original transaction currency. A card issuer's conversion may cause the amount in your account currency to differ from the original debit. We do not impose a refund fee. Separate issuer charges are governed by your issuer's terms, without excluding any liability we may have under law.",
          "The time for a refund to appear on your statement depends on the issuer's processing. We can confirm when the refund was initiated and provide available tracing information if it does not arrive.",
        ],
      },
      {
        heading: "Giving cancellation notice",
        blocks: [
          "Email **info@kirosim.com** with a clear statement that you wish to cancel and enough information to identify the purchase. You may use the optional form below, but using it is not a condition of cancellation. Where a statutory deadline applies, sending a clear notice before it expires is sufficient; our later response does not make the notice late.",
          "**Optional cancellation form**",
          "To: BRIGHTCORE ENTERTAINMENT LTD, Dept 6957, 196 High Road, Wood Green, London, United Kingdom, N22 8HH; info@kirosim.com.",
          "I/We hereby give notice that I/We cancel my/our contract for the following service:",
          {
            list: [
              "Plan or service:",
              "Order reference:",
              "Ordered on:",
              "Name of consumer(s):",
              "Address of consumer(s):",
              "Email used for the purchase:",
              "Date:",
              "Signature of consumer(s), only if this notice is sent on paper:",
            ],
          },
          "Delete whichever of “I/We” and “my/our” does not apply. No physical eSIM return is required.",
        ],
      },
      {
        heading: "Review of a decision",
        blocks: [
          "If you disagree with an outcome, reply to our decision or email **info@kirosim.com** with the reason and any additional evidence. The [Complaints Handling Policy](https://kirosim.com/legal/complaints) explains the review process. It does not restrict access to your card issuer, a competent authority or the courts.",
        ],
      },
    ],
  },
  {
    slug: "delivery-activation",
    title: "Digital Delivery & Activation Policy",
    shortTitle: "Delivery & Activation",
    lastUpdated: LAST_UPDATED,
    summary:
      "How your eSIM is delivered electronically, what to do if credentials are missing, and when your Plan's validity begins.",
    sections: [
      {
        heading: "Electronic delivery",
        blocks: [
          "**BRIGHTCORE ENTERTAINMENT LTD**, company number **17357935**, trading as **Kirosim**, supplies travel eSIMs electronically through **kirosim.com**. Our registered office is **Dept 6957, 196 High Road, Wood Green, London, United Kingdom, N22 8HH**. Delivery and installation enquiries should be sent to **info@kirosim.com**.",
          "No physical SIM, parcel or postal delivery is included. Following successful payment and order processing, your installation credentials and instructions are made available through the order or account interface and sent to the email address provided for the order.",
        ],
      },
      {
        heading: "Timing and order confirmation",
        blocks: [
          "We aim to fulfil orders promptly after payment and order processing. Any specific delivery timeframe shown before payment forms part of the order information. Payment verification, provisioning or technical issues may cause a delay; we will address a failure to meet the agreed timeframe under the agreement and applicable law.",
          "A successful card authorisation alone does not prove that usable credentials have been delivered. Keep the order confirmation, Plan details and applicable policy version for reference.",
        ],
      },
      {
        heading: "Missing or inaccessible credentials",
        blocks: [
          "If your email does not arrive, check the order or account page and your spam folder. Confirm that you used the correct email address. Contact us with the order reference if credentials remain missing, inaccessible or invalid.",
          "If you entered the wrong email, tell us promptly. We may verify ownership before correcting delivery details or resending credentials. If a code may have been exposed to someone else, tell us so that we can assess whether it can be secured or replaced.",
          "Access to usable credentials in your account may allow installation while an email is delayed. However, an inaccessible or invalid code is not successful delivery simply because an email was sent. If we cannot fulfil the order as agreed, the [Refund & Cancellation Policy](https://kirosim.com/legal/refund-cancellation) applies.",
        ],
      },
      {
        heading: "Before installation",
        blocks: [
          "Check that the device is eSIM-compatible and network-unlocked, and establish an internet connection for setup. Follow the instructions supplied for your device and Plan. A device family name alone may not establish compatibility for every regional model.",
          "Check your travel dates and the Plan duration before proceeding. If any installation deadline applies, it must be stated before purchase and in your order information. Contact us if that information is unclear; an undisclosed deadline will not be added retrospectively to your order.",
        ],
      },
      {
        heading: "When validity starts",
        blocks: [
          "**Successful installation of the eSIM starts the purchased Plan's validity period immediately.** It does not wait for arrival in the destination, connection to a foreign network or first data use.",
          "Receiving an email, downloading instructions or viewing a QR code does not itself install the profile. Completing the profile installation does. Install only when you are ready for the validity period to run.",
          "After installation, the period runs continuously. Switching off the device, turning off the profile, removing it, travelling outside coverage or leaving data unused does not pause or restart the period. If the expiry information does not reflect the duration purchased, contact us for investigation and correction.",
        ],
      },
      {
        heading: "Connecting after installation",
        blocks: [
          "To use connectivity, you may need to enable the installed profile, select it for mobile data, enable data roaming for that profile and apply the settings in the instructions. These steps enable connectivity; they do not postpone the validity start established by installation.",
          "Keep settings for your ordinary SIM separate. Enabling roaming on your ordinary SIM may incur charges from your existing provider. Any voice, SMS, hotspot or other feature must be included in the Plan to be available.",
          "Connectivity is limited to the Plan's stated destinations and remains subject to the restricted-country rules in the [Terms & Conditions](https://kirosim.com/legal/terms). Installation does not override those restrictions or guarantee network reception everywhere.",
        ],
      },
      {
        heading: "QR-code security, deletion and transfers",
        blocks: [
          "Treat QR codes and manual installation credentials as confidential. Do not post them publicly or provide them to an unknown person. A copy of a QR image does not create another licensed eSIM or guarantee another installation.",
          "Do not assume that a profile can be installed on multiple devices, transferred or reinstalled after deletion. These functions depend on the profile and device. Contact us before deleting an eSIM, resetting a device or attempting a transfer.",
          "If replacement is possible and chargeable, we will explain the cost before you agree. No replacement fee will displace a remedy we must provide without charge under law.",
        ],
      },
      {
        heading: "Top-ups",
        blocks: [
          "Top-ups are available only for eligible eSIMs and require a separate purchase. Before payment, the Top-up description must explain when its allowance becomes available, when its own validity starts and whether it affects an existing allowance or expiry date.",
          "A Top-up does not automatically repair a deleted, incompatible or unusable profile. Verify that the correct eSIM is selected before paying. No Top-up is purchased or charged automatically.",
        ],
      },
      {
        heading: "Help and remedies",
        blocks: [
          "Email **info@kirosim.com** with the order reference, device model, destination and relevant error details. Do not send passwords, full card information or unnecessary personal information in screenshots.",
          "Delivery, installation and service availability are distinct stages. Receiving a QR code does not by itself remove cancellation or fault-related rights. See the [Refund & Cancellation Policy](https://kirosim.com/legal/refund-cancellation) for the available remedies.",
        ],
      },
    ],
  },
  {
    slug: "acceptable-use",
    title: "Acceptable Use & Fair Usage Policy",
    shortTitle: "Acceptable Use",
    lastUpdated: LAST_UPDATED,
    summary:
      "The rules for lawful use of Kirosim eSIMs and networks, how allowances and unlimited Plans work, and enforcement.",
    sections: [
      {
        heading: "Scope",
        blocks: [
          "This Policy applies to Kirosim accounts, eSIMs and Plans supplied by **BRIGHTCORE ENTERTAINMENT LTD**, company number **17357935**, at **kirosim.com**. Our registered office is **Dept 6957, 196 High Road, Wood Green, London, United Kingdom, N22 8HH**. Contact **info@kirosim.com** about an issue or restriction.",
          "Read this Policy with the [Terms & Conditions](https://kirosim.com/legal/terms) and the description of your Plan. It distinguishes prohibited conduct from technical limits attached to a particular package.",
        ],
      },
      {
        heading: "Lawful and authorised use",
        blocks: [
          "You must be at least 18 and use the service in compliance with applicable law, the Plan's coverage and our restricted-country rules. You must not:",
          {
            list: [
              "use stolen payment details, another person's identity or unauthorised account access;",
              "conceal relevant details to evade geographic restrictions or security checks;",
              "distribute malware, carry out denial-of-service attacks or attempt unauthorised access to networks or systems;",
              "use the service for fraud, scams, unlawful harassment or distribution of unlawful material;",
              "send unlawful bulk messages or operate abusive automated communications;",
              "interfere with provisioning, metering, charging or security controls;",
              "copy, clone, publicly distribute or unlawfully resell eSIM credentials; or",
              "exploit an error to obtain service or refunds to which you are not entitled.",
            ],
          },
          "Use is intended for personal travel connectivity. Commercial resale, operating a public connectivity service or deploying the Plan as infrastructure for a commercial communications operation requires our prior agreement. Ordinary lawful personal browsing, messaging, streaming or use of security tools is not prohibited solely by its category.",
        ],
      },
      {
        heading: "Allowances and expiry",
        blocks: [
          "For a fixed-data Plan, the purchased allowance and validity apply as stated before payment. Background applications, updates and connected devices can consume allowance. Monitor device settings and any available usage information; reporting may not be instantaneous.",
          "The original Plan's validity begins on successful eSIM installation. Unused allowance expires at the stated end of the Plan unless rollover is expressly included. Top-ups have the separately disclosed conditions shown before their purchase.",
          "Usage disagreements may be referred to **info@kirosim.com**. We will consider the relevant records and your explanation; our records are not declared conclusive in every dispute.",
        ],
      },
      {
        heading: "Unlimited Plans and fair usage",
        blocks: [
          "Where an unlimited Plan is offered, “unlimited” describes the data allowance subject to the material conditions disclosed for that Plan. It does not promise uninterrupted maximum speed or unrestricted use on any device or network.",
          "Before purchase, the Plan description must identify any applicable high-speed allowance, fair-use threshold, reduced speed, reset interval, hotspot allowance or restriction on supported use. A general reference to “fair use” is not a substitute for disclosing a material limit.",
          "We will not impose an undisclosed numerical cap or reduce service solely because lawful use is considered “excessive” without an applicable disclosed condition or a genuine, proportionate network-protection reason. This Policy does not invent a universal daily allowance or reduced speed for all Plans.",
        ],
      },
      {
        heading: "Hotspot and device sharing",
        blocks: [
          "Hotspot or tethering is permitted where supported by the Plan and device. It may share the main allowance or have a separate disclosed allowance. Connected devices can use data rapidly through updates or background activity.",
          "Hotspot support does not authorise resale of connectivity or sharing eSIM credentials. You are responsible for taking reasonable steps to secure a hotspot you operate and stopping misuse that you become aware of.",
        ],
      },
      {
        heading: "Network protection and technical management",
        blocks: [
          "Networks may need to manage congestion, address attacks, maintain systems or comply with law. Temporary technical management must not be used as an undisclosed permanent limitation inconsistent with what was sold.",
          "Normal variation in mobile performance is distinct from a promised feature being unavailable. If a restriction materially prevents provision of the purchased service, the [Refund & Cancellation Policy](https://kirosim.com/legal/refund-cancellation) and applicable remedies remain relevant.",
        ],
      },
      {
        heading: "Investigation and enforcement",
        blocks: [
          "Where there is reasonable evidence of a breach, we may investigate, warn you, require the conduct to stop, restrict the affected function or suspend or terminate the affected service. The action should reflect the seriousness, urgency and impact of the issue.",
          "Where possible and lawful, we will explain the reason and give an opportunity to correct a remediable issue. Immediate action may be necessary for a security threat, serious unlawful use or a legal order. We will not disclose security-sensitive details where doing so would compromise a legitimate investigation.",
          "A suspected breach does not automatically justify confiscating an unused balance or denying every refund. Financial consequences must be lawful and proportionate. Mandatory rights remain available.",
        ],
      },
      {
        heading: "Review and reporting",
        blocks: [
          "To challenge a restriction, email **info@kirosim.com** with your order reference and relevant explanation. We will review the available information and correct a restriction applied in error where possible. Any unresolved dispute can be escalated under the [Complaints Handling Policy](https://kirosim.com/legal/complaints).",
          "Report a compromised account, exposed QR code or suspected misuse promptly. Do not include another person's unnecessary personal information in a report.",
        ],
      },
    ],
  },
  {
    slug: "complaints",
    title: "Complaints Handling Policy",
    shortTitle: "Complaints",
    lastUpdated: LAST_UPDATED,
    summary:
      "How to raise a complaint with BRIGHTCORE ENTERTAINMENT LTD, how it is investigated, time limits, and independent routes available to you.",
    sections: [
      {
        heading: "Who handles complaints",
        blocks: [
          "**BRIGHTCORE ENTERTAINMENT LTD**, company number **17357935**, trading as **Kirosim**, handles complaints about purchases and services at **kirosim.com**.",
          "Contact us at **info@kirosim.com** or write to **Dept 6957, 196 High Road, Wood Green, London, United Kingdom, N22 8HH**. You do not need to use a particular form or pay a fee to complain.",
        ],
      },
      {
        heading: "What to include",
        blocks: [
          "Please explain the problem, what happened and the outcome you are seeking. An order reference, purchase email, relevant dates, device model and destination can help us locate the issue. Provide only information relevant to the complaint.",
          "Do not send account passwords, full payment-card information or card security codes. Conceal unrelated personal information in screenshots. If someone complains on your behalf, we may request reasonable evidence of their authority before sharing your information.",
          "If you need an adjustment to communicate with us, explain what would help and we will consider a reasonable alternative.",
        ],
      },
      {
        heading: "Our process",
        blocks: [
          "We will record the complaint, identify the issue and review relevant order, payment, service and correspondence records. We may ask focused questions or seek technical information from organisations involved in providing the service.",
          "We aim to acknowledge complaints within **two business days** and provide a substantive response within **15 business days**. For these targets, business days are Monday to Friday excluding public holidays in England and Wales. These are handling targets, not a promise that every technical issue can be resolved within that period.",
          "If more time is needed, we will explain the reason and provide an expected update date. These targets do not extend a statutory refund deadline, privacy-request deadline or any other mandatory time limit. A cancellation notice takes effect according to the applicable cancellation rules, not when our investigation ends.",
        ],
      },
      {
        heading: "Connectivity problems during travel",
        blocks: [
          "If the problem concerns an active trip, include the destination and the nature of the connection failure so that we can assess its urgency. Report the issue while it is occurring where possible. Do not delete the eSIM unless instructed.",
          "This complaints process is not an emergency service. Use an appropriate alternative means to contact emergency services or obtain essential assistance.",
        ],
      },
      {
        heading: "Our response",
        blocks: [
          "Our response will explain the issue considered, the outcome and its main reasons. Where appropriate, it will describe the corrective action, replacement, refund or other remedy and any further steps needed.",
          "We will assess the complaint on its merits and under the applicable purchase terms and law. We will not reject a complaint merely because it was expressed informally or did not cite a legal provision.",
        ],
      },
      {
        heading: "Asking for a review",
        blocks: [
          "If you disagree with the response, reply or email **info@kirosim.com** explaining which part you dispute and provide any additional information. We will arrange a further review, by another person where practicable, and explain the resulting position.",
          "You do not have to repeat information already reasonably available to us. The review does not remove or postpone an external right or deadline.",
        ],
      },
      {
        heading: "External rights",
        blocks: [
          "You may seek independent advice, contact your card issuer about rights relating to a transaction, approach a competent consumer-protection authority or bring a claim in a court with jurisdiction. Our internal process is not a mandatory substitute for those routes.",
          "For a privacy concern, you may contact the [UK Information Commissioner's Office](https://ico.org.uk/make-a-complaint/) or another competent data-protection authority. See our [Privacy Policy](https://kirosim.com/legal/privacy).",
          "Where applicable law requires us to provide details of an alternative dispute-resolution body or state whether we will participate in a procedure, we will provide that information at the appropriate stage. This Policy does not represent membership of a particular ombudsman, regulatory approval or participation in a scheme that has not been established.",
        ],
      },
      {
        heading: "Complaint records",
        blocks: [
          "We use complaint information to investigate, communicate the outcome, identify relevant service problems and meet legal obligations. Retention and disclosure are governed by our Privacy Policy. Access is limited according to the purpose of the review.",
        ],
      },
    ],
  },
];

export function policyBySlug(slug: string): Policy | undefined {
  return policies.find((p) => p.slug === slug);
}
