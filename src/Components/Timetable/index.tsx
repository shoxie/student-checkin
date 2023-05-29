import Timetable from 'react-timetable-events'

export default function TimeTableContainer({ data }: { data: any }) {
    if (typeof window === "undefined") return null

    return (
        <Timetable
            events={data}
            hoursInterval={{
                from: 7,
                to: 21
            }}
            style={{ height: '100vh', width: '100%' }}
            timeLabel=""
        />
    )
}