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
        // Step 3: Check if load factor has been execeded and if so; double capicity,create new bucket, and rehash old bucket and push that into new bucket with double capicity
        let load = (this.length() + 1) / this.capacity;

        if (load > this.loadFactor) {
            this.capacity *= 2;
            let oldBuckets = this.buckets;
            this.buckets = Array(this.capacity)

            oldBuckets.forEach(bucket => {
                if (bucket) {

                    for (let pair of bucket) {
                        this.set(pair[0], pair[1]);
                    }
                }
            })

        }
        // Step 4: Create the key-value pair
        let arr = [key, value];

        // Step 5: Check if bucket exists
        if (this.buckets[index]) {
            // BUCKET EXISTS - either update or collision

            let bucket = this.buckets[index];  // Get array of pairs
            let flag = false;  // Assume key doesn't exist yet

            // Step 6: Search through all pairs in bucket
            bucket.forEach(pair => {
                if (pair[0] === key) {  // Found matching key?
                    // SCENARIO 2: UPDATE - same key, update value
                    pair[1] = value;  // Update old value with new value
                    flag = true;  // Mark that we found it
                }
                // If no match, keep looping to check other pairs
            });

            // Step 7: After checking all pairs
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
        let bucket = this.buckets[index];
        let value;
        if (!bucket) {
            return null
        } else {
            bucket.forEach(pair => {
                if (pair[0] === key) {
                    value = pair[1];
                }
            })
            return value;
        }
    }
    has(key) {
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        let bucket = this.buckets[index];

        if (!bucket) {
            return false;
        }

        for (let pair of bucket) {
            if (pair[0] === key) {
                return true;
            }
        }

        return false;
    }
    remove(key) {
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let bucket = this.buckets[index];

        if (!bucket) {
            return false;
        }
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return true;
            }
        }

        return false;
    }
    length() {

        let number = 0;
        this.buckets.forEach(bucket => {
            if (bucket) {
                number += bucket.length;
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
                for (let pair of bucket) {
                    arr.push(pair[0])
                }
            }
        });
        return arr;
    }
    values() {
        let arr = [];
        this.buckets.forEach(bucket => {
            if (bucket) {
                for (let pair of bucket) {
                    arr.push(pair[1])
                }
            }
        });
        return arr;
    }
    entries() {
        let arr = [];
        this.buckets.forEach(bucket => {
            if (bucket) {
                for (let pair of bucket) {

                    arr.push(pair)
                }
            }
        });
        return arr;
    }
}