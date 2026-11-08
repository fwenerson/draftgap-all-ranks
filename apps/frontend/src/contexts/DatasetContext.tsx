import {
    JSXElement,
    createContext,
    createEffect,
    createResource,
    useContext,
} from "solid-js";
import {
    DATASET_VERSION,
    Dataset,
} from "@draftgap/core/src/models/dataset/Dataset";

const DATASET_BASE_URL =
    (import.meta.env.VITE_DATASET_URL as string | undefined) ||
    (import.meta.env.VITE_S3_PUBLIC_URL
        ? `${import.meta.env.VITE_S3_PUBLIC_URL}/datasets`
        : `https://bucket.draftgap.com/datasets`);

const fetchDataset = async (name: "30-days" | "current-patch") => {
    try {
        const response = await fetch(
            `${DATASET_BASE_URL}/v${DATASET_VERSION}/${name}.json`,
        );
        const json = await response.json();
        return json as Dataset;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

function createDatasetContext() {
    // Fork requirement: strictly use 30 days (patch=30) and all ranks (tier=all)
    const [dataset] = createResource("30-days", fetchDataset);
    const dataset30Days = dataset;

    const isLoaded = () =>
        dataset() !== undefined;

    createEffect(() => {
        (window as any).DRAFTGAP_DEBUG = (window as any).DRAFTGAP_DEBUG || {};
        // eslint-disable-next-line solid/reactivity
        (window as any).DRAFTGAP_DEBUG.dataset = dataset;
        // eslint-disable-next-line solid/reactivity
        (window as any).DRAFTGAP_DEBUG.dataset30Days = dataset30Days;
    });

    return {
        dataset,
        dataset30Days,
        isLoaded,
    };
}

const DatasetContext = createContext<ReturnType<typeof createDatasetContext>>();

export function DatasetProvider(props: { children: JSXElement }) {
    return (
        <DatasetContext.Provider value={createDatasetContext()}>
            {props.children}
        </DatasetContext.Provider>
    );
}

export function useDataset() {
    const useCtx = useContext(DatasetContext);
    if (!useCtx) throw new Error("No DatasetContext found");

    return useCtx;
}
