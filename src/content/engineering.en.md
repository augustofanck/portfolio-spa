## Engineering Notes

This is where I try to sound less like “tutorial dev” and more like a **product-minded engineer**.

### Patterns I use

- **Consistent payloads** for dynamic forms (e.g., `items[index][field]`)
- **Anti-duplication** (front-end + server-side validation in real life)
- **State-driven UX** (loading, error, empty, success)
- **Safe evolution**: keep data contracts stable

### Example: budget line items

**Problem:** duplicates + inconsistent totals  
**Mitigation:** block on the front-end, recompute totals, validate on the back-end  
**V2:** e2e tests and inconsistency logs
