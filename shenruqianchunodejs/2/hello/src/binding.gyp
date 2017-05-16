{
    'targets'：[
        {
            'target_name':'hello',
            'sources':[
                'src/hello.cc'
            ],
            'conditions':[
                [
                    'OS == "OSX"',
                    {
                        'libraries':['-lnode.lib']
                    }
                ]
            ]
        }
    ]
}