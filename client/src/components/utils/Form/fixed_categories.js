const shipping = [
    {
        "_id": true,
        "name": 'Yes'
    },
    {
        "_id": false,
        "name": 'No'
    }
]

const price = [
    {
        "_id": 0,
        "name": "Any",
        "array": []
    },
    {
        "_id": 1,
        "name": "1",
        "array": [0, 1.99]
    },
    {
        "_id": 2,
        "name": "2",
        "array": [2, 2.99]
    },
    {
        "_id": 3,
        "name": "3",
        "array": [3, 3.99]
    },
    {
        "_id": 4,
        "name": "4",
        "array": [4, 4.99]
    },
    {
        "_id": 5,
        "name": "5+",
        "array": [5, 100]
    },
]
export {
    price,
    shipping
}