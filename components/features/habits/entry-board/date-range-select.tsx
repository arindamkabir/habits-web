import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { eachDayOfInterval, format, add } from 'date-fns';
import useAppStore from '@/store/store';

function DateRangeSelect() {
  const showingDates = useAppStore((state) => state.showingDates);
  const setShowingDates = useAppStore((state) => state.setShowingDates);

  const handlePreviousClick = () => {
    const newShowingDates = eachDayOfInterval({
      start: add(showingDates[0], { days: -7 }),
      end: add(showingDates[6], { days: -7 }),
    });
    setShowingDates(newShowingDates);
  };

  const handleNextClick = () => {
    const newShowingDates = eachDayOfInterval({
      start: add(showingDates[0], { days: 7 }),
      end: add(showingDates[6], { days: 7 }),
    });
    setShowingDates(newShowingDates);
  };

  return (
    <div className="flex justify-center items-center space-x-8 mb-16">
      <button
        type="button"
        className="h-12 w-12 hover:border hover:border-secondary-content hover:bg-base-300 rounded-full flex items-center justify-center"
        onClick={handlePreviousClick}
      >
        <ArrowLongLeftIcon className="h-8 w-8" />
      </button>

      <div className="text-lg font-medium">
        {`${format(showingDates[0], 'PP')} - ${format(showingDates[6], 'PP')}`}
      </div>

      <button
        type="button"
        className="h-12 w-12 hover:border hover:border-secondary-content hover:bg-base-00 rounded-full flex items-center justify-center"
        onClick={handleNextClick}
      >
        <ArrowLongRightIcon className="h-8 w-8" />
      </button>
    </div>
  );
}

export default DateRangeSelect;
