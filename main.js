class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = Array(16);
    }
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
        }
        return hashCode;
    }
    set(key, value) {
        // Step 1: Hash the key to get bucket index
        let index = this.hash(key);

        // Step 2: Safety check
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        // Step 3: Create the key-value pair
        let arr = [key, value];

        // Step 4: Check if bucket exists
        if (this.buckets[index]) {
            // BUCKET EXISTS - either update or collision

            let bucket = this.buckets[index];  // Get array of pairs
            let flag = false;  // Assume key doesn't exist yet

            // Step 5: Search through all pairs in bucket
            bucket.forEach(pair => {
                if (pair[0] === key) {  // Found matching key?
                    // SCENARIO 2: UPDATE - same key, update value
                    pair[1] = value;  // Update old value with new value
                    flag = true;  // Mark that we found it
                }
                // If no match, keep looping to check other pairs
            });

            // Step 6: After checking all pairs
            if (!flag) {
                // SCENARIO 3: COLLISION - key not found, add new pair
                bucket.push(arr);  // Add new key-value pair to bucket
            }

        } else {
            // SCENARIO 1: EMPTY BUCKET - first pair at this index
            this.buckets[index] = [arr];  // Create new bucket with first pair
        }
    }
    get(key) {
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        let arr = this.buckets[index];
        if (!arr) {
            return null
        } else {
            return arr[1];
        }
    }
    has(key) {
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        let arr = this.buckets[index];
        if (!arr) {
            return false
        } else if (arr[0] === key) {
            return true
        } return false
    }
    remove(key) {
        if (this.has(key)) {
            let index = this.hash(key);
            delete this.buckets[index];
            return true
        } return false;
    }
    length() {
        let number = 0;
        this.buckets.forEach(bucket => {
            if (bucket) {
                number++;
            }
        });
        return number
    }
    clear() {
        this.buckets = Array(16);
    }
    keys() {
        let arr = [];
        this.buckets.forEach(bucket => {
            if (bucket) {
                arr.push(bucket[0])
            }
        });
        return arr;
    }
    values() {
        let arr = [];
        this.buckets.forEach(bucket => {
            if (bucket) {
                arr.push(bucket[1])
            }
        });
        return arr;
    }
    entries() {
        let arr = [];
        this.buckets.forEach(bucket => {
            if (bucket) {
                arr.push(bucket)
            }
        });
        return arr;
    }
}