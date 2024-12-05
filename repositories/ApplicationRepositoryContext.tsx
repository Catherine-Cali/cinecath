import React, { createContext, useContext, PropsWithChildren } from "react";
import { MovieRepositoryTMDB } from "@/repositories/MovieRepositoryTMDB";
import { MovieRepository } from "@/repositories/interface/MovieRepository";
import { TVShowRepositoryTMDB } from "@/repositories/TVShowsRepositoryTMDB";
import { TVShowRepository } from "@/repositories/interface/TVShowRepository";

interface ApplicationRepository {
    movieRepository: MovieRepository;
    tvshowRepository: TVShowRepository;
}


const ApplicationRepositoryContext = createContext<ApplicationRepository | null>(null);

// Hook personnalisé pour utiliser le contexte
export const useApplicationRepositoryContext = () => {
    const context = useContext(ApplicationRepositoryContext);

    if (context === null) {
        throw new Error("useApplicationRepositoryContext must be wrapped within a provider");
    }

    return context;
};

// Fournisseur de contexte
const ApplicationRepositoryContextProvider = ({ children }: PropsWithChildren) => {
    return (
        <ApplicationRepositoryContext.Provider
            value={{
                movieRepository: new MovieRepositoryTMDB(),
                tvshowRepository: new TVShowRepositoryTMDB(), 
            }}
        >
            {children}
        </ApplicationRepositoryContext.Provider>
    );
};

export default ApplicationRepositoryContextProvider;
