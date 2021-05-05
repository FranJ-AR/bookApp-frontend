import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

export class Constants{

    
    //public static ROOT_CONNECTION = "http://localhost:8080/";
    public static ROOT_CONNECTION = "https://library-app91.herokuapp.com/";
    public static DEFAULT_DISABLE_CLOSE_DIALOG = false;
    public static DEFAULT_AUTO_FOCUS_DIALOG = false;
    public static DEFAULT_MAX_WIDTH_DIALOG = "400px";
    public static DEFAULT_TITLE_DIALOG_ERROR: string = "Error al realizar la acción";
    public static DEFAULT_MESSAGE_DIALOG_ERROR: string = "El sistema encontró un error "+
    "al realizar la acción, prueba de nuevo o "+
    "intenta más tarde, si el error persiste contacta con la biblioteca";

    static getDefaultDialogConfig():MatDialogConfig<any>{

        let defaultDialogConfig = new MatDialogConfig();

        defaultDialogConfig = new MatDialogConfig();

        defaultDialogConfig.disableClose = Constants.DEFAULT_DISABLE_CLOSE_DIALOG;
        defaultDialogConfig.autoFocus = Constants.DEFAULT_AUTO_FOCUS_DIALOG;
        defaultDialogConfig.maxWidth = Constants.DEFAULT_MAX_WIDTH_DIALOG;

        return defaultDialogConfig;

    }

}