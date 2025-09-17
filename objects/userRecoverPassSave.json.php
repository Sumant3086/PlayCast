<?php
header('Content-Type: application/json');
global $global, $config;
if (!isset($global['systemRootPath'])) {
    require_once '../videos/configuration.php';
}
     
require_once $global['systemRootPath'] . 'objects/user.php';
$obj = new stdClass();
if (empty($_POST['user']) || empty($_POST['recoverPassword']) || empty($_POST['newPassword']) || empty($_POST['newPasswordConfirm'])) {
    $obj->error = __("There is missing data to recover your password");
    die(json_encode($obj));
}

_error_log("RecoverPass start user={$_POST['user']} " .' IP='.getRealIpAddr().' '.$_SERVER['HTTP_USER_AGENT'] . json_encode(debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS)));
   
$user = new User(0, $_POST['user'], false);
if (empty($user)) {
    $obj->error = __("User not found");
    die(json_encode($obj));
} elseif ($user->getRecoverPass() !== $_POST['recoverPassword']) {
    $obj->error = __("Recover password does not match");
    die(json_encode($obj));
} elseif ($_POST['newPassword'] !== $_POST['newPasswordConfirm']) {
    $obj->error = __("Confirmation password does not match");
    die(json_encode($obj));
} else {
    $user->setPassword($_POST['newPassword']);
    $user->setRecoverPass(true);
    if ($user->save()) {
        _error_log("Your Password has been set user={$_POST['user']}, email={$user->getEmail()} " .' IP='.getRealIpAddr().' '.$_SERVER['HTTP_USER_AGENT'] . json_encode(debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS)));
        $obj->success = __("Your Password has been set");
        die(json_encode($obj));
    }
}
