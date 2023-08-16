import { ProjectInterface } from '@/common.types';
import Modal from '@/components/Modal';
import ProjectActions from '@/components/ProjectActions';
import RelatedProjects from '@/components/RelatedProjects';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async({params:{id}}:{params:{id:string}}) => {
    const session=await getCurrentUser();
    const result= await getProjectDetails(id) as {project?:ProjectInterface};
    if (!result?.project){
        <p>Failed to fetch project information</p>
    }
    // console.log(result?.project)
  return ( 
    <Modal >
    
      <div className=' mx-1 flex flex-col'>
      {result?.project?.createdBy &&(
        <div className='flex items-start flex-row gap-3  '>
          <Link href={`/profile/${result?.project?.createdBy.id}`}>
      <Image
      src={result?.project?.createdBy?.avatarUrl}
      className="rounded-full"
      height={22}
      width={35}
      // className='rounded-full'
      alt='profile image'
      />
      </Link>
      <div className=' flex flex-col ' >
      {result?.project?.title &&(
        <h3 className='font-bold'>{result?.project?.title.toUpperCase()}</h3>)}
      <div className='flex flex-row gap-3'>
        <Link className='text-slate-600' href={`/profile/${result?.project?.createdBy?.id}`}>{result?.project?.createdBy?.name}</Link>
      {/* <h2 className='text-slate-600' > {result?.project?.createdBy?.name}   </h2> */}
        {result?.project?.category &&(
          <Link href={`/?category=${result?.project?.category}`} className='text-purple-400'>{result?.project?.category}</Link>
          // <h2 className='text-blue-500'>{result?.project?.category}</h2>
        )}
      </div>
      </div>
      
      
      
      {session?.user?.email===result?.project?.createdBy?.email &&(
        <div className='flex justify-end items-end gap-8'>
          <ProjectActions projectId={result?.project?.id}/>
        </div>
      )}
     </div>
      )}
      

        {result?.project?.image &&(
        <Image
          src={result?.project?.image}
          
          width={800}
          height={400}
          className=' mx-2 w-fit lg:w-full'
          alt="project profile"
        />
        )}
        <div className='flex items-center flex-col gap-1'>
          {result?.project?.description &&(
            <h3 className='font-semibold'>{result?.project?.description}</h3>

          )}
          <div className='flex flex-row gap-2 text-blue-600 italic '>
          {result?.project?.liveSiteUrl && 
          <Link href={`${result?.project?.liveSiteUrl}`} target='_blank' className='hover:not-italic'>Demo</Link>
            

          }
                    {result?.project?.githubUrl && 
          <Link href={`${result?.project?.githubUrl}`} target='_blank' className='hover:not-italic'>Github</Link>


          }

          </div>
        </div>
        
        <section className="flexCenter w-full gap-8 mt-28">
                <span className="w-full h-0.5 bg-light-white-200" />
                <Link href={`profile/${result?.project?.createdBy?.id}`} className="min-w-[82px] h-[82px]">
                  {result?.project?.createdBy?.id &&(
                    <Image
                    src={result?.project?.createdBy?.avatarUrl}
                    className="rounded-full"
                    width={82}
                    height={82}
                    alt="profile image"
                />
                  )}
                    
                </Link>
                <span className="w-full h-0.5 bg-light-white-200" />
            </section>
            {result?.project?.createdBy?.id && result?.project?.id && (
            <RelatedProjects
             userId={result?.project?.createdBy?.id} projectId={result?.project?.id}/> 
             )}
            </div>
    </Modal>
  )
}

export default page