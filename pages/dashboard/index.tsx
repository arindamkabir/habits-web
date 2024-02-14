import AddHabitDrawer from '@/components/dashboard/drawers/add-habit-drawer'
import { Button } from '@/components/ui/button'
import useBoundedStore from '@/store/store'
import React, { Fragment } from 'react'
const habits = [
    {
        name: "Exercise"
    }
]

const DashboardPage = () => {
    const addHabitDrawerOpen = useBoundedStore(state => state.addHabitDrawerOpen);
    const openAddHabitDrawer = useBoundedStore(state => state.openAddHabitDrawer);

    return (
        <div>
            <div className="flex justify-end w-full">
                <Button onClick={() => openAddHabitDrawer(true)}>Add Habit</Button>
            </div>

            <div className="max-w-4xl mx-auto my-10">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-4">

                    </div>
                    <div className='text-sm'>
                        Sun
                    </div>
                    <div className='text-sm'>
                        Mon
                    </div>
                    <div className='text-sm'>
                        Tue
                    </div>
                    <div className='text-sm'>
                        Wed
                    </div>
                    <div className='text-sm'>
                        Thu
                    </div>
                    <div className='text-sm'>
                        Fri
                    </div>
                    <div className='text-sm'>
                        Sat
                    </div>
                    <div>

                    </div>

                    {
                        habits.map((item, index) =>
                            <Fragment key={`habit-${index}`}>
                                <div className="col-span-4">
                                    {item.name}
                                </div>
                                <div className='h-7 w-7 rounded-md bg-purple-700'>
                                    <span className=''>

                                    </span>
                                </div>
                                <div className='h-7 w-7 rounded-md bg-gray-700'>

                                </div>
                                <div className='h-7 w-7 rounded-md bg-purple-700'>

                                </div>
                                <div className='h-7 w-7 rounded-md bg-purple-700'>

                                </div>
                                <div className='h-7 w-7 rounded-md bg-purple-700'>

                                </div>
                                <div className='h-7 w-7 rounded-md bg-purple-700'>

                                </div>
                                <div className='h-7 w-7 rounded-md bg-purple-700'>

                                </div>
                                <div>

                                </div>
                            </Fragment >
                        )
                    }
                </div>
            </div>
            <AddHabitDrawer />
        </div>
    )
}

export default DashboardPage