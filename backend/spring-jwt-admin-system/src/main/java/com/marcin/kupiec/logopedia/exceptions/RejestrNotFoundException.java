package com.marcin.kupiec.logopedia.exceptions;

public class RejestrNotFoundException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public RejestrNotFoundException(Long id) {
        super("Rejestr id not found : " + id);
    }

}
