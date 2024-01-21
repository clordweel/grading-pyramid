export type SideEventData = {
    level: number;
    side: Side;
};
type Store = {
    paused: boolean;
    speed: number;
    perspective: number;
    grades: Grade[];
    gradesNumber: number;
    height: number;
    width: number;
    gap: number;
    hideSides: Side[];
    toolbar: boolean;
};
type Side = "top" | "bottom" | "left" | "right" | "front" | "back";
export type Grade = Partial<Record<Side, {
    text?: string;
    textColor?: string;
    color?: string;
    hide?: boolean;
}>>;
export type GradingPyramidOptions = {
    scope?: string;
    render?: boolean;
    gradesNumber?: number;
    perspective?: number;
    height?: number;
    width?: number;
    gap?: number;
    baseGrade?: Grade;
    running?: boolean;
    speed?: number;
    hideSides?: Side[];
    toolbar?: boolean;
    onClick?: (data: SideEventData, event: MouseEvent) => void;
};
export default class GradingPyramid {
    constructor(selectorOrTarget: string | HTMLElement, options?: GradingPyramidOptions);
    private readonly container;
    private store;
    defaultOptions: Required<GradingPyramidOptions>;
    private readonly baseGrade;
    private readonly scope;
    private readonly running;
    private readonly onClick;
    play(updateState?: boolean): void;
    pause(updateState?: boolean): void;
    mutate<K extends keyof Store>(key: K, value: Store[K]): void;
    prune(): void;
    rerender(): void;
    render(grades?: Grade[]): void;
    private toolbarDom;
    private hoverGrade;
    private leaveGrade;
    private clickGrade;
    private gradeDom;
    private computeGrade;
    private cls;
    private style;
}
export {};
