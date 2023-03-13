import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import ProjectInfo from '../components/ProjectInfo/ProjectInfo';
import Grid from '../components/Grid/Grid';
import Card from '../components/Card/Card';
import Spinner from '../components/Spinner/Spinner';
import Head from 'next/head'
import { IMAGE_BASE_URL, projectUrl, similarProjectsUrl } from '../config';
import { basicFetch } from '../utils/fetchFunctions';

// Types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Project } from '../utils/types';

type Props = {
    project: Project;
    title: string;
    similarProjects: Project[];
};

const Project: NextPage<Props> = ({ project, similarProjects, title }: Props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [project]);

    const handleClick = () => {
        setLoading(true);
    };

    return (
        <>
            <Head>
                <title>Edith - Développeuse web - {title}</title>
                <meta name='description' content={`Page de présentation du ${title}`} />
                <meta property='og:title' content={`Edith - Développeuse web - ${title}`} />
                <meta property='og:description' content={`Page de présentation du ${title}`} />
                <meta property='og:url ' content={`https://edithbredon.fr/${project.slug}`} />
                <meta property='og:type' content='website' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <Header />
                <Breadcrumb title={project.name} />
                <ProjectInfo
                    thumbUrl={project.imageName ? IMAGE_BASE_URL + project.imageName : '/no_image.jpg'}
                    images={project.images ? project.images : []}
                    backgroundImgUrl={project.imageName ? IMAGE_BASE_URL + project.imageName : '/no_image.jpg'}
                    projectLink={project.projectLink ? project.projectLink : ''}
                    githubLink={project.githubLink ? project.githubLink : ''}
                    title={project.name}
                    year={project.year}
                    lastUpdate={project.lastUpdate}
                    summary={project.description}
                    frontendLanguages={project.frontendLanguages ? project.frontendLanguages : []}
                    backendLanguages={project.backendLanguages ? project.backendLanguages : []}
                    tools={project.tools ? project.tools : []}
                />
                {loading && <Spinner />}
                {similarProjects && similarProjects.length > 0 &&
                    <Grid className='px-6 mt-4 w-full md:w-6/6 mb-4 md:mt-10' title='Projets qui pourraient vous intéresser'>
                        {similarProjects.map(project => (
                            <Link key={project.id} href={`/${project.slug}`} passHref onClick={handleClick}>
                                <Card
                                    imgUrl={project.imageName ? IMAGE_BASE_URL + project.imageName : '/no_image.jpg'}
                                    title={project.name}
                                    subtitle={project.description}
                                />
                            </Link>
                        ))}
                    </Grid>
                }
            </main>
        </>
    );
};

export default Project;

// getStaticProps is called at build time on server-side.
// It won't be called on client-side, so you can even do
export const getStaticProps: GetStaticProps = async context => {
    const slug = context.params?.slug as string;

    try {
        const projectEndpoint: string = projectUrl(slug);
        const project = await basicFetch<Project>(projectEndpoint);

        const similarProjectsEndpoint: string = similarProjectsUrl(slug);
        const similarProjects = await basicFetch<Project[]>(similarProjectsEndpoint);

        return {
            props: {
                project,
                title:  `projet : ${project.name}`,
                similarProjects
            },
            revalidate: 600 // Re-build page every 10 minutes
        };
    } catch (error) {
        return {
            notFound: true,
        }
    }
};

// getStaticPaths is for dynamic routes only.
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        // All the paths that should be rendered to HTML at build time.
        paths: [],
        // fallback is for pages that don't have a static version at build time.
        fallback: 'blocking'
    };
};