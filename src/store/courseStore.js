import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const BASE_URL = 'https://680b2a88d5075a76d98a0d7a.mockapi.io/courses'

const useCourseStore = create(
    persist(
        (set) => ({
            courses: [],
            loading: false,
            error: null,

            fetchCourses: async () => {
                set({ loading: true, error: null })
                try {
                    const res = await axios.get(`${BASE_URL}`)
                    set({ courses: res.data, loading: false })
                } catch (err) {
                    set({ error: err.message, loading: false })
                }
            },

            addCourse: async ({ title, description, author }) => {
                try {
                    const res = await axios.post(`${BASE_URL}`, { title, description, author })
                    set((state) => ({ courses: [...state.courses, res.data] }))
                } catch (err) {
                    set({ error: err.message })
                }
            },

            updateCourse: async (id, updatedData) => {
                try {
                    const res = await axios.put(`${BASE_URL}/${id}`, updatedData)
                    set((state) => ({
                        courses: state.courses.map((course) =>
                            course.id === id ? res.data : course
                        ),
                    }))
                } catch (err) {
                    set({ error: err.message })
                }
            },

            deleteCourse: async (id) => {
                try {
                    await axios.delete(`${BASE_URL}/${id}`)
                    set((state) => ({
                        courses: state.courses.filter((course) => course.id !== id),
                    }))
                } catch (err) {
                    set({ error: err.message })
                }
            }
                
        }),
        {
            name: 'course-storage',
            getStorage: () => localStorage,
        }
    )
)

export default useCourseStore