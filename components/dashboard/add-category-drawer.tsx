import FormDrawer from '@/components/ui/form-drawer';
import useAppStore from '@/store/store';
import AddCategoryForm from './forms/add-category-form';

function AddCategoryDrawer() {
    const addCategoryDrawerOpen = useAppStore((state) => state.addCategoryDrawerOpen);
    const openAddCategoryDrawer = useAppStore((state) => state.openAddCategoryDrawer);

    return (
        <FormDrawer
          title="Add New Category"
          open={addCategoryDrawerOpen}
          onClose={() => openAddCategoryDrawer(false)}
        >
            <AddCategoryForm />
        </FormDrawer>
    );
}

export default AddCategoryDrawer;
