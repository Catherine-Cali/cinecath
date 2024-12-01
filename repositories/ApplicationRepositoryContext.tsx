import React, { createContext, useContext, PropsWithChildren } from "react";
import { MovieRepositoryTMDB } from "@/repositories/MovieRepositoryTMDB";
import { MovieRepository } from "@/repositories/interface/MovieRepository";

// Interface pour le contexte
interface ApplicationRepository {
    movieRepository: MovieRepository;
}

// Création du contexte avec une valeur par défaut de `null`
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
            value={{ movieRepository: new MovieRepositoryTMDB(), }}
        >
            {children}
        </ApplicationRepositoryContext.Provider>
    );
};

export default ApplicationRepositoryContextProvider