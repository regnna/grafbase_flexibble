"use client"
import { categoryFilters } from '@/constant';
import {usePathname,useRouter,useSearchParams} from 'next/navigation';

const Categories = () => {
    const router=useRouter();
    const pathName=usePathname();
    const searchParams =useSearchParams();

    const category=searchParams.get('category');
    // console.log(category)
    const handleTags=(filter:string)=>{
        if(filter==='all'){
            router.push(`/`)

        }
        else{
        router.push(`${pathName}?category=${filter}`)
        }
    }

  return (
   <div className='flexBetween w-full gap-5 flex-wrap'>
    <ul className='flex gap-3 overflow-auto '>
        {category===null && (
            <button type='button' 
            onClick={()=>handleTags('all')}
            className={`bg-light-white text-purple-400 font-medium underline decoration-purple-400 px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
            >All</button>
        )}
        {category && (
            <button type='button' 
            onClick={()=>handleTags('all')}
            className={`px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
            >All</button>
        )}
        {categoryFilters.map((filter)=>(
            <button
            key={filter}
            type='button'
            onClick={()=>handleTags(filter)}
            className={`${category===filter?'bg-light-white text-purple-400 font-medium underline decoration-purple-400':'font-normal'}px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
            >{filter}
            </button>
        ))}
    </ul>

   </div>
  )
}

export default Categories