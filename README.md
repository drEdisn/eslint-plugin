# ✨ ESLint Plugin

## 🚀 Main responsibilities

### 1️⃣ Class Member Ordering
Require your class members to be **ordered** like:
   - `inject`
   - `constants`
   - `default`
   - `select`
   - `signals`
   - `viewChild/contentChild`
   - `inputs/outputs`
   - `accessor get/set`

**Example:**
```typescript
    // Invalid:
    public get fifth() {
        return 4;
    }

    protected readonly sixth = signal(5);
    private readonly third = 2;
    private readonly first = inject(MyFirstService);
    public readonly fourth = input(3);
    private readonly second = inject(MySecondService);

    // Valid:
    private readonly first = inject(MyFirstService);
    private readonly second = inject(MySecondService);

    private readonly third = 2;

    protected readonly sixth = signal(5);

    public readonly fourth = input(3);

    public get fifth() {
        return 4;
    }
```

### 2️⃣ Vertical Spacing
Require your class members to be divided with an empty line by this scheme:
   - `private readonly`
   - `private`
   - `protected readonly`
   - `protected`
   - `public readonly`
   - `public`

**Example:**
```typescript
    // Invalid:
    private readonly first = 0;
    private readonly second = 1;
    private third = 2

    // Valid:
    private readonly first = 0;

    private second = 1;

    protected readonly third = 2

    protected fourth = 1;

    public readonly fifth = 1;

    public sixth = 1;
```

### 3️⃣ Readonly Enforcement
Require your class members to be **readonly** ANYWAY if it isn't used:

**Example:**
```typescript
    // Invalid:
    private first = 0;
    protected second = 1;
    public third = 2

    // Valid:
    private readonly first = 0;
    protected readonly third = 2
    public readonly fifth = 1;
```
