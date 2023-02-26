export interface IMassagesConnect {
    initialize(): Promise<void>;
}

export interface IMassagesHandle<P, C> {
    publish(payload: P): Promise<boolean>;
    consuming(payload: C): Promise<void>;
}
