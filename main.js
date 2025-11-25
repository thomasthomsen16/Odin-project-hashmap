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
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        let arr = [key, value];
        this.buckets[index] = arr;
    }
    get(key){
        let index=this.hash(key);
                if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        let arr=this.buckets[index];
        if(!arr){
            return null
        } else {
            return arr[1];
        }
    }
}