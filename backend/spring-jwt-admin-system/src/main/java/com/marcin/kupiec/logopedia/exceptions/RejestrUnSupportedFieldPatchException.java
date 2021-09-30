package com.marcin.kupiec.logopedia.exceptions;

import java.util.Set;

public class RejestrUnSupportedFieldPatchException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public RejestrUnSupportedFieldPatchException(Set<String> keys) {
        super("Field " + keys.toString() + " update is not allow.");
    }

}
