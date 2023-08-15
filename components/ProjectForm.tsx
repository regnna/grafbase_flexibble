"use client"
import { ProjectInterface, SessionInterface } from "@/common.types"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import FormField from "./FormField"
import { categoryFilters } from '@/constant';
import CustomMenu from "./CustomMenu"
import Button from "./Button"
import { createNewProject, fetchToken, updateProject } from "@/lib/actions"
import { useRouter } from "next/navigation"



type Props={
    type:string,
    session:SessionInterface,
    project?:ProjectInterface
}
const ProjectForm = ({type,session,project}:Props) => {

  const router=useRouter();

    const handleForSubmit=async(e:React.FormEvent)=>{
      e.preventDefault();

      setisSubmitting(true);

      const {token}= await fetchToken()
      try{
        if(type==='create'){
          console.log(session?.user?.id);

          await createNewProject(form,session?.user?.id,token)

          router.push('/');

        }
        // console.log(type)
        if(type==='edit'){
          // router.push('/');
          await updateProject(form,project?.id as string,token)
          router.push('/');

        }


      }catch(error){
        console.log(error)
        // alert(`Failed to ${type === "create" ? "create" : "edit"} a project. Try again!`);
      }finally{
        setisSubmitting(false)
      }

    };

    const handleChangeImage=(e:ChangeEvent<HTMLInputElement>)=> {
        e.preventDefault();
        const file=e.target.files?.[0];
        if(!file) return;
        if(!file.type.includes('image')){
          return alert("Please upload an image file");
        }
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>{
          const result=reader.result as string;
          handleStateChange('image',result);
        }

    };
    const handleStateChange=(fieldName: string,value: string)=>{
        setForm((prevState)=>
          ({...prevState,[fieldName]:value}))
    }
    const [isSubmitting, setisSubmitting] = useState(false)
const [form,setForm]=useState({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    liveSiteUrl : project?.liveSiteUrl  || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || '',
})
    // const image=null;
  return (
    <form onSubmit={handleForSubmit} className="flexStart form">
<div className=" form_image-container my-3">
    <label htmlFor='poster' className="items-center form_image-label flex flex-col">

      {!form.image && 'Choose a poster '}
      </label>
      <input 
      id="image"
      type="file"
      accept='image/*'
      required={type==='create'}
      className=" my-2 from_image-input"
      onChange={handleChangeImage}
      />
      

      
      
{form.image &&(
  <Image
  src={form?.image}
  className="sm:p-10  object-contain z-20"
  alt="Project poster"
  fill
  />
)}
</div>
<FormField
  title="Title"
  state={form.title}
  placeholder="Flexible"
  setState={(value)=>handleStateChange('title',value)}

/>
<FormField
  title="Description"
  state={form.description}
  placeholder="ShowCase and Discover remarkable developer projects"
  setState={(value)=>handleStateChange('description',value)}

/>
<FormField
  type='url'
  title="Website URL"
  state={form.liveSiteUrl}
  placeholder="https://ww7.soap2dayhd.co"
  setState={(value)=>handleStateChange('liveSiteUrl',value)}

/>
<FormField
  type='url'
  title="Github URL"
  state={form.githubUrl}
  placeholder="https://github.com/regnna"
  setState={(value)=>handleStateChange('githubUrl',value)}

/>

{/* CustomeInput category... */}
<CustomMenu
  title='category'
  state={form.category}
  filters={categoryFilters}
  setState={(value)=>handleStateChange('category',value)}

/>
<div className="flexStart w-full">
  {/* <button>Create</button> */}
  <Button
  title={isSubmitting ? 
    `${type==='create'? 'Creating':'Editing'}`:
    `${type==='create'? 'Create':'Edit'}`}
  type="submit"
  leftIcon={isSubmitting?"":"/plus.svg"}

  isSubmitting={isSubmitting}
  />
    

</div>
    </form>
  )
}

export default ProjectForm