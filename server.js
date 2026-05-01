const express = require('express')
const app = express()
app.use(express.json())
let students = []
let currentId = 1

app.get('/students', (req, res) => {
    res.status(200).json(students)
})

app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const student = students.find(s => s.id === id)
    if (!student) {
        return res.status(404).json({ message: 'Student not found' })
    }
    res.status(200).json(student)
})

app.post('/students', (req, res) => {
    const { name, course, age } = req.body
    if (!name || !course || !age) {
        return res.status(400).json({ message: 'Invalid input' })
    }
    const newStudent = {
        id: currentId++,
        name,
        course,
        age
    }
    students.push(newStudent)
    res.status(201).json(newStudent)
})

app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { name, course, age } = req.body
    const student = students.find(s => s.id === id)
    if (!student) {
        return res.status(404).json({ message: 'Student not found' })
    }
    if (!name || !course || !age) {
        return res.status(400).json({ message: 'Invalid input' })
    }
    student.name = name
    student.course = course
    student.age = age
    res.status(200).json(student)
})

app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = students.findIndex(s => s.id === id)
    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' })
    }
    const deleted = students.splice(index, 1)
    res.status(200).json(deleted[0])
})
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

app.listen(3000, () => {
    console.log(`Server running on port 3000`)
})