import FormDrawer from '@/components/ui/form-drawer'
import useBoundedStore from '@/store/store';
import AddCategoryForm from './forms/add-category-form';

const AddCategoryDrawer = () => {
    const addCategoryDrawerOpen = useBoundedStore(state => state.addCategoryDrawerOpen);
    const openAddCategoryDrawer = useBoundedStore(state => state.openAddCategoryDrawer);

    return (
        <FormDrawer
            title={"Add New Category"}
            open={addCategoryDrawerOpen}
            onClose={() => openAddCategoryDrawer(false)}
        >
            <AddCategoryForm />
        </FormDrawer>
    )
}

export default AddCategoryDrawer