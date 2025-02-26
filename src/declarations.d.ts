declare module '@mkkellogg/gaussian-splats-3d' {
  export class Viewer {
    constructor(options: {
      threeScene: any;
      camera: any;
      renderer: any;
      selfDrivenMode?: boolean;
      useBuiltInControls?: boolean;
    });

    addSplatScene(url: string, options?: { showLoadingUI?: boolean }): Promise<void>;
    start(): void;
  }
}
