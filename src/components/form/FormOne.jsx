import React, { useState } from 'react';
// REACT BOOTSTRAP COMPONENTS
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { TagPicker } from 'rsuite';
const datarui = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
    item => ({ label: item, value: item })
);
export default function FormOne() {
    // const data = templateSubmit();
    const [form, setForm] = useState({
        title: '500bros: The Best Gaming Experience in 2021',
        cate: 'standard',
        postType: '',
        tags: '',
        content: `For those of us who want to say thank you to our moms, it’s not always easy to put those big feelings in words. Which is where Dribbble comes in.

These eight shots crystallize the hard work moms put into keeping their kids alive, happy, and healthy. They might give you the inspiration you need for filling out that card—or stand alone for your mom’s interpretation.

![Single Post Images](/images/post-single/post-single-img-1.jpg)
*Drawn for an insurance company*

Moms are the ones who bandage our boo-boos when we’re little and continue to take care of us as we get older—often sacrificing their own needs so they can help with ours. Cruising on a bike to help heal our injuries is the most mom thing one can do.

![Single Post Images](/images/clientbanner/clientbanner.jpg)

> If you’ve been waiting for an invitation, this calligraphy is it. Commissioned by Facebook, this is a hand-lettered design for a poster. Quote is Facebook Building 8 VP’s Regina Dugan—and mine.

Moms are the ones who bandage our boo-boos when we’re little and continue to take care of us as we get older—often sacrificing their own needs so they can help with ours. Cruising on a bike to help heal our injuries is the most mom thing one can do.

They’re the ones we rely on for playdates and emotional support, homework help and babysitting. Moms are the ultimate dependable support. Like, hopefully, the button on your jeans.

### Unordered List Style?

- The refractor telescope uses a convex lens to focus the light on the eyepiece.
- The reflector telescope has a concave lens which means it bends in. It uses mirrors to focus the image that you eventually see.
- Collimation is a term for how well tuned the telescope is to give you a good clear image of what you are looking at. You want your telescope to have good collimation so you are not getting a false image of the celestial body.
- Aperture is a fancy word for how big the lens of your telescope is. But it’s an important word because the aperture of the lens is the key to how powerful your telescope is. Magnification has nothing to do with it, its all in the aperture.
- Focuser is the housing that keeps the eyepiece of the telescope, or what you will look through, in place. The focuser has to be stable and in good repair for you to have an image you can rely on.
- Mount and Wedge. Both of these terms refer to the tripod your telescope sits on. The mount is the actual tripod and the wedge is the device that lets you attach the telescope to the mount.

Moms are like…buttons? Moms are like glue. Moms are like pizza crusts. Moms are the ones who make sure things happen—from birth to school lunch.

They’re the ones we rely on for playdates and emotional support, homework help and babysitting. Moms are the ultimate dependable support. Like, hopefully, the button on your jeans.`
    })
    const [errors, setErrors] = useState({})
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        // console.log(form)
        // get our new errors
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            // No errors! Put any logic here for the form submission!
            alert('Thank you for your feedback!')
        }
    }

    const findFormErrors = () => {
        const { name, food, rating, comment } = form
        const newErrors = {}
        // name errors
        if (!name || name === '') newErrors.name = 'cannot be blank!'
        else if (name.length > 30) newErrors.name = 'name is too long!'
        // food errors
        if (!food || food === '') newErrors.food = 'select a food!'
        // rating errors
        if (!rating || rating > 5 || rating < 1) newErrors.rating = 'must assign a rating between 1 and 5!'
        // comment errors
        if (!comment || comment === '') newErrors.comment = 'cannot be blank!'
        else if (comment.length > 100) newErrors.comment = 'comment is too long!'

        return newErrors
    }

    // useEffect(() => {
    //     $('#multiple-select-field').select2({
    //         theme: "bootstrap-5",
    //         width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    //         placeholder: $(this).data('placeholder'),
    //         closeOnSelect: false,
    //     });
    // }, []);

    return (
        // <CustomProvider>
            <>
            <TagPicker data={datarui} style={{ width: 300 }} />


        </>

        // </CustomProvider>

    )
}
