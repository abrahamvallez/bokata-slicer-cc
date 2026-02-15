# User Story Mapping: Feature identification Examples

## Example: E-commerce Platform

**Input Context:**
- Domain: Online shopping
- Purpose: Let customers browse and buy products
- Users: Shoppers, sellers, admins
- Core: Browse, search, purchase, manage orders, track delivery

**Features Identified:**

```markdown
## Features Backbone

### Feature Overview
Users discover products, manage their shopping cart, complete purchases, and track their orders from placement to delivery.

### Features Map

#### Feature 1: User Shops for Products
**Purpose:** Discover and explore products to find items of interest

**User Tasks:**
1. **Browses Product Catalog** - View product catalog by category
2. **Searches for Products** - Find specific items using search
3. **Views Product Details** - See detailed information and images
4. **Compares Multiple Products** - Compare multiple items side-by-side
5. **Filters Products by Criteria** - Narrow results by price, rating, etc.

#### Feature 2: User Manages Shopping Cart
**Purpose:** Collect and manage items before purchase

**User Tasks:**
1. **Adds Items to Cart** - Select products for purchase
2. **Updates Cart Quantity** - Change item quantities
3. **Removes Items from Cart** - Delete unwanted items
4. **Saves Cart for Later** - Preserve cart across sessions

#### Feature 3: User Completes Purchase
**Purpose:** Complete purchase and provide delivery information

**User Tasks:**
1. **Enters Shipping Address** - Provide delivery location
2. **Selects Payment Method** - Choose how to pay
3. **Reviews Order Details** - Confirm purchase details
4. **Completes Checkout Process** - Finalize and place order

#### Feature 4: User Tracks Order
**Purpose:** Monitor order status and manage post-purchase

**User Tasks:**
1. **Views Order Status** - Check order progress
2. **Tracks Shipment Location** - See delivery tracking
3. **Views Order History** - See past purchases
4. **Initiates Product Return** - Request product return

### Feature Dependencies
- **Critical**: "User Shops for Products" must exist before "User Manages Shopping Cart"
- **Critical**: "User Manages Shopping Cart" must exist before "User Completes Purchase"
- **Critical**: "User Completes Purchase" must exist before "User Tracks Order"
- **Independent**: "User Shops for Products" tasks can be in any order
```
