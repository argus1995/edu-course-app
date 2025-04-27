import React, { useEffect } from 'react';
import Tabs from './Tabs'
import Cards from './Cards'
import { tabTitle } from '../data'
import useCourseStore from '../store/courseStore'

export default function Card() {
    const tabElements = tabTitle.map((entry) => {
        return (
            <Tabs key={entry.id} id={entry.id} name={entry.name} />
        )
    })

    const { courses, fetchCourses } = useCourseStore()

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <section className="card-section">
            <div className="card-title">
                <h3>Koleksi Video Pembelajaran Unggulan</h3>
                <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
            </div>
            <div className="tabs">
                {tabElements}
            </div>
            <div className="card-container">
                {
                    courses.length === 0 ? <p className="no-courses">No courses available.</p> :
                        courses.map((course) => (
                            <Cards key={course.id} img={`/card-${course.id % 9}.jpg`} avatar={`/avatar-card-${course.id % 9}.png`} course={course} />
                        ))}
            </div>
        </section>
    )
}