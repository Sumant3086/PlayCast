<?php
global $global, $config;
if (!isset($global['systemRootPath'])) {
    require_once '../videos/configuration.php';
}

if (!User::isAdmin()) {
    forbiddenPage();
}

header('Content-Type: application/json');
$row = Plugin::getAvailablePlugins(true);
$total = count($row);

if (!User::isAdmin()) {
    foreach ($row as $key => $value) {
        if (!empty($row[$key]->installedPlugin['object_data'])) {
            $row[$key]->installedPlugin['object_data'] = '';
        }
    }
}
$json = _json_encode($row);

if (empty($json)) {
    _error_log(print_r($row, true));
    // remove object data
    foreach ($row as $key => $value) {
        $row[$key]->installedPlugin['object_data'] = '';
    }
    $json = _json_encode($row);
}

$array = array(
    'current'=>1,
    'rowCount'=>$total,
    'total'=>$total,
    'rows'=>_json_decode($json),
);

echo _json_encode($array);
