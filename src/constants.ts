import { MatDialogConfig } from "@angular/material/dialog";

export class Constants{

    public static ROOT_CONNECTION = "http://localhost:8080/";
    public static DEFAULT_DISABLE_CLOSE_DIALOG = false;
    public static DEFAULT_AUTO_FOCUS_DIALOG = true;
    public static DEFAULT_MAX_WIDTH_DIALOG = "400px";
    public static defaultDialogConfig: MatDialogConfig<any>|null = null

    static getDefaultDialogConfig():MatDialogConfig<any>{

        if(this.defaultDialogConfig === null){

        this.defaultDialogConfig = new MatDialogConfig();

        this.defaultDialogConfig.disableClose = Constants.DEFAULT_DISABLE_CLOSE_DIALOG;
        this.defaultDialogConfig.autoFocus = Constants.DEFAULT_AUTO_FOCUS_DIALOG;
        this.defaultDialogConfig.maxWidth = Constants.DEFAULT_MAX_WIDTH_DIALOG

        }

        return this.defaultDialogConfig

    }

}