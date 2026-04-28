## Engineering Notes

This space gathers principles and decisions I have been applying in real projects and demos. The goal is to show how I think before coding: which risks I look for, how I protect data, and how I turn business rules into predictable interfaces.

### Principles I follow

- **Clarity before abstraction:** I prefer starting with an explicit implementation and introducing abstractions when repetition or complexity justifies it.
- **Data consistency:** totals, balances, statuses, and permissions need backend protection, even when the interface already guides the user.
- **Operational UX:** internal tools should reduce mistakes, provide fast feedback, and make the next step clear.
- **Evolution without breaking contracts:** when a flow already exists, changes need to preserve legacy data and operational expectations.
- **Security as part of the flow:** authentication, permissions, validation, and access control are not final details; they shape the workflow.

### Internal systems need predictability

In operational systems, users are often working under pressure: serving customers, closing cash flow, checking orders, or moving inventory.

That is why I try to build interfaces that answer simple questions:

- What is happening right now?
- What is the next safe step?
- Does the displayed data match the business rule?
- Is the user allowed to perform this action?
- Does the system prevent duplication or inconsistency?

This mindset appears in `estoque-ci4`, especially around orders, payments, inventory, and dashboards.

### Validation and consistency

One rule I keep reinforcing: the interface may guide, but the backend must guarantee.

Practical examples:

- money values are normalized before persistence;
- Brazilian date inputs are converted to database format;
- order totals are recalculated from items;
- payments should not exceed the order balance;
- sensitive permissions need route/filter validation, not only hidden buttons.

This prevents the classic “it worked on the screen, but broke the data”.

### Integrations and states

Integrations rarely return only success. A real flow needs to handle:

- loading;
- empty;
- error;
- pending;
- approved;
- failed;
- retry;
- duplicate prevention.

That is why the async search and payment state demos exist in the portfolio: they isolate small decisions that show up in larger systems.

### Data contracts

When modules talk to each other, contracts matter. An order depends on customer, items, payments, seller, and status. An inventory item needs code, price, availability, and category. A search flow needs to return data in a shape the UI can render safely.

The sooner these contracts are clear, the less fragile the project becomes.

### What I am studying and applying

- tests for critical business rules;
- clearer organization around use cases;
- better logs and auditing;
- API design with well-defined scopes;
- denser but readable internal interfaces;
- documentation that helps future maintenance.

### Next evolutions

I want this portfolio to document more technical decisions, not only finished screens. The goal is for each project to show three things:

1. the problem that existed;
2. the decisions made;
3. what I would do differently in a next version.
