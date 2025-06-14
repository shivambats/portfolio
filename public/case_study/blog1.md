---
title: Handling exceptions in Python a cleaner way, using Decorators
type: Blog
image: /public/case_study/decorator_exception.png
date: 2020-02-12
tags: [Python, Programming, Decorators]
excerpt: Handling exceptions in python can get in some cases repetitive and ugly, we can solve that using decorators.
---

# Functions in Python

Functions in Python are **first-class objects**, which means they can:
- Be assigned to a variable
- Be passed as an argument
- Be returned from another function
- Be stored in any data structure

```python
def example_function():
    print("Example Function called")

some_variable = example_function
some_variable()
```

**Output:**
```
Example Function called
```

As you can see, we have assigned `example_function` to `some_variable`, which makes `some_variable` callable.

---

# Decorators

The first-class object property of functions helps us use **Decorators** in Python.

**Decorators** are functions that take another function as an argument. This enables us to add our logic before and after the execution of the passed function.

```python
def decorator_example(func):
    print("Decorator called")

    def inner_function(*args, **kwargs):
        print("Calling the function")
        func(*args, **kwargs)
        print("Function's execution is over")

    return inner_function

@decorator_example
def some_function():
    print("Executing the function")
    # Function logic goes here
```

**Explanation:**
- We use the `@decorator_example` syntax to apply the decorator.
- `some_function` is passed as an argument to `decorator_example`.

**Output:**
```
Decorator called
Calling the function
Executing the function
Function's execution is over
```

---

# Error Handling Using Decorators

Decorators can be used for:
- Logging
- Validation
- Common logic across multiple functions
- **Exception handling** (as demonstrated below)

### Traditional Error Handling Example

```python
def area_square(length):
    try:
        print(length**2)
    except TypeError:
        print("area_square only takes numbers as the argument")

def area_circle(radius):
    try:
        print(3.142 * radius**2)
    except TypeError:
        print("area_circle only takes numbers as the argument")

def area_rectangle(length, breadth):
    try:
        print(length * breadth)
    except TypeError:
        print("area_rectangle only takes numbers as the argument")
```

### Problem:
- **Repetitive code.**

---

## Clean Solution Using Decorators

```python
def exception_handler(func):
    def inner_function(*args, **kwargs):
        try:
            func(*args, **kwargs)
        except TypeError:
            print(f"{func.__name__} only takes numbers as the argument")
    return inner_function

@exception_handler
def area_square(length):
    print(length * length)

@exception_handler
def area_circle(radius):
    print(3.14 * radius * radius)

@exception_handler
def area_rectangle(length, breadth):
    print(length * breadth)

# Function Calls
area_square(2)
area_circle(2)
area_rectangle(2, 4)
area_square("some_str")
area_circle("some_other_str")
area_rectangle("some_other_rectangle")
```

### Output:
```
4
12.56
8
area_square only takes numbers as the argument
area_circle only takes numbers as the argument
area_rectangle only takes numbers as the argument
```

---

## Benefits:
- **Less repetition**
- **Cleaner code**
- **Easier to maintain**
- **Scalable**: You can extend `exception_handler` to handle custom exceptions or additional logging as required.

---

You can further expand this approach to handle more complex scenarios and improve your code quality and readability. 